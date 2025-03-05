const express = require('express');
const Product = require('../dao/models/product.model');
const Cart = require('../dao/models/cart.model');
const Ticket = require('../models/Ticket');
const { authMiddleware, isAdmin, authenticateUser, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener carrito por ID
router.get('/:cid', async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate('products.product');
  res.json(cart);
});

// Agregar producto al carrito
router.post('/:cid/products/:pid', authenticateUser, authorize('user'), async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    const product = await Product.findById(pid);

    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const item = cart.products.find(p => p.product.equals(pid));
    if (item) {
      item.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto' });
  }
});

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  cart.products = cart.products.filter(p => !p.product.equals(req.params.pid));
  await cart.save();
  res.json(cart);
});

// Vaciar carrito
router.delete('/:cid', async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.cid, { products: [] });
  res.json({ message: 'Carrito vaciado' });
});

// Finalizar compra
router.post('/:cid/purchase', authenticateUser, async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate('products.product');

  if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

  let totalAmount = 0;
  const unprocessedProducts = [];

  for (const item of cart.products) {
    if (item.product.stock >= item.quantity) {
      totalAmount += item.product.price * item.quantity;
      item.product.stock -= item.quantity;
      await item.product.save();
    } else {
      unprocessedProducts.push(item.product._id);
    }
  }

  const ticket = await Ticket.create({
    amount: totalAmount,
    purchaser: req.user.email,
  });

  cart.products = cart.products.filter(item => unprocessedProducts.includes(item.product._id));
  await cart.save();

  res.json({ ticket, unprocessedProducts });
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

// Crear un nuevo producto (solo admin)
router.post('/', authMiddleware, isAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
});

// Actualizar producto (solo admin)
router.put('/:id', authMiddleware, isAdmin, async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
});

// Eliminar producto (solo admin)
router.delete('/:id', authMiddleware, isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Producto eliminado' });
});

module.exports = router;
