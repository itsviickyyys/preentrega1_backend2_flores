const express = require('express');
const userController = require('../controllers/userControllers');

const router = express.Router();

// Rutas de usuario
router.post('/', userController.createUser); // Crear usuario
router.get('/', userController.getUsers); // Obtener todos los usuarios
router.get('/:id', userController.getUserById); // Obtener usuario por ID
router.put('/:id', userController.updateUser); // Actualizar usuario
router.delete('/:id', userController.deleteUser); // Eliminar usuario

module.exports = router;
