const express = require('express');
const Product = require('../dao/models/product.model');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

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

