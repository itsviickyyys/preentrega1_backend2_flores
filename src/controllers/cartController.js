const CartRepository = require('../repositories/cartRepository');

const cartController = {
  async getCartById(req, res) {
    try {
      const cart = await CartRepository.getCartById(req.params.cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
  },

  async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await CartRepository.addProductToCart(cid, { product: pid, quantity: 1 });
      res.json({ message: 'Producto agregado al carrito', cart: updatedCart });
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar producto al carrito', error });
    }
  },

  async removeProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const updatedCart = await CartRepository.removeProductFromCart(cid, pid);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto del carrito', error });
    }
  },

  async emptyCart(req, res) {
    try {
      await CartRepository.emptyCart(req.params.cid);
      res.json({ message: 'Carrito vaciado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al vaciar el carrito', error });
    }
  }
};

module.exports = cartController;
