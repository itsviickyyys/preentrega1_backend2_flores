const UserModel = require('../models/userModel');

class UserDAO {
    async create(userData) {
        return await UserModel.create(userData);
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findById(id) {
        return await UserModel.findById(id);
    }

    async update(id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id) {
        return await UserModel.findByIdAndDelete(id);
    }
}

module.exports = new UserDAO();
