const express = require('express');
const Product = require('../dao/models/product.model');
const { authenticateUser, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

// 🔐 Solo los administradores pueden crear productos
router.post('/', authenticateUser, authorize('admin'), async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Producto creado', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto' });
  }
});

// 🔐 Solo los administradores pueden actualizar productos
router.put('/:id', authenticateUser, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json({ message: 'Producto actualizado', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
});

// 🔐 Solo los administradores pueden eliminar productos
router.delete('/:id', authenticateUser, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
});

module.exports = router;
