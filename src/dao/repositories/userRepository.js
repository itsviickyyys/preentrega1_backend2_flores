const UserDAO = require('../daos/userDAO');

class UserRepository {
    async createUser(userData) {
        return await UserDAO.create(userData);
    }

    async getUserByEmail(email) {
        return await UserDAO.findByEmail(email);
    }

    async getUserById(id) {
        return await UserDAO.findById(id);
    }

    async updateUser(id, updateData) {
        return await UserDAO.update(id, updateData);
    }

    async deleteUser(id) {
        return await UserDAO.delete(id);
    }
}

module.exports = new UserRepository();
