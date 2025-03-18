const User = require('../dao/models/user.model');

class UserRepository {
  async createUser(userData) {
    return await User.create(userData);
  }

  async getUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();

