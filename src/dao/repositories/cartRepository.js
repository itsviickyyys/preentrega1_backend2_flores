const Cart = require('../dao/models/cart.model');

class CartRepository {
  async getCartById(cid) {
    return await Cart.findById(cid).populate('products.product');
  }

  async addProductToCart(cid, product) {
    const cart = await Cart.findById(cid);
    cart.products.push(product);
    return await cart.save();
  }

  async removeProductFromCart(cid, pid) {
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(p => !p.product.equals(pid));
    return await cart.save();
  }

  async emptyCart(cid) {
    return await Cart.findByIdAndUpdate(cid, { products: [] });
  }
}

module.exports = new CartRepository();
