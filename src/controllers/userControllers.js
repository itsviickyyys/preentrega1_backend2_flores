const UserRepository = require('../repositories/userRepository');

const userController = {
  async createUser(req, res) {
    try {
      const user = await UserRepository.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  },

  async getUsers(req, res) {
    try {
      const users = await UserRepository.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await UserRepository.getUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await UserRepository.updateUser(req.params.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  },

  async deleteUser(req, res) {
    try {
      await UserRepository.deleteUser(req.params.id);
      res.json({ message: 'Usuario eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  }
};

module.exports = userController;

