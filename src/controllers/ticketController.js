const TicketRepository = require('../repositories/ticketRepository');
const CartRepository = require('../repositories/cartRepository');

const ticketController = {
  async createTicket(req, res) {
    try {
      const cart = await CartRepository.getCartById(req.params.cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

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

      const ticket = await TicketRepository.createTicket({
        amount: totalAmount,
        purchaser: req.user.email
      });

      cart.products = cart.products.filter(item => unprocessedProducts.includes(item.product._id));
      await cart.save();

      res.json({ ticket, unprocessedProducts });
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar la compra', error });
    }
  }
};

module.exports = ticketController;
