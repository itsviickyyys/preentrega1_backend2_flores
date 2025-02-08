const express = require('express');
const Cart = require('../dao/models/cart.model');
const { authenticateUser, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

// 🔐 Solo los usuarios pueden agregar productos a su carrito
router.post('/:cid/products/:pid', authenticateUser, authorize('user'), async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    cart.products.push({ product: pid, quantity: 1 });
    await cart.save();

    res.json({ message: 'Producto agregado al carrito', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el producto' });
  }
});

module.exports = router;



