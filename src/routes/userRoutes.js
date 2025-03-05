const express = require('express');
const userController = require('../controllers/userControllers');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rutas de usuario
router.post('/', userController.createUser); // Crear usuario
router.get('/', authMiddleware, isAdmin, userController.getUsers); // Obtener todos los usuarios
router.get('/:id', authMiddleware, userController.getUserById); // Obtener usuario por ID
router.put('/:id', authMiddleware, userController.updateUser); // Actualizar usuario
router.delete('/:id', authMiddleware, isAdmin, userController.deleteUser); // Eliminar usuario

module.exports = router;
