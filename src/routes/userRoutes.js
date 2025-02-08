const express = require('express');
const userController = require('../controllers/userControllers');
const { authenticateUser, authorize } = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authenticateUser, authorize('admin'), userController.getUsers);
router.get('/:id', authenticateUser, userController.getUserById);
router.put('/:id', authenticateUser, userController.updateUser);
router.delete('/:id', authenticateUser, authorize('admin'), userController.deleteUser);

module.exports = router;
