const Product = require('../dao/models/product.model');

class ProductRepository {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async createProduct(productData) {
    return await Product.create(productData);
  }

  async updateProduct(id, productData) {
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}

module.exports = new ProductRepository();
