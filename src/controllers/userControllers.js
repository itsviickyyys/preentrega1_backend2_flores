const UserRepository = require('../repositories/userRepository');
const UserDTO = require('../dtos/userDTO');

const getCurrentUser = async (req, res) => {
    try {
        const user = await UserRepository.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const userDTO = new UserDTO(user);
        res.json(userDTO);  // Solo se envían los datos necesarios
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = { getCurrentUser };
