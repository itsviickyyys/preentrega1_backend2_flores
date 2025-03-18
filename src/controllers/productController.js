const ProductRepository = require('../repositories/productRepository');

const productController = {
  async getAllProducts(req, res) {
    try {
      const products = await ProductRepository.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await ProductRepository.getProductById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
  },

  async createProduct(req, res) {
    try {
      const product = await ProductRepository.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  },

  async updateProduct(req, res) {
    try {
      const updatedProduct = await ProductRepository.updateProduct(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  },

  async deleteProduct(req, res) {
    try {
      await ProductRepository.deleteProduct(req.params.id);
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }
};

module.exports = productController;

