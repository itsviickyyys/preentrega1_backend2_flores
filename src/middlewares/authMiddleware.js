const jwt = require('jsonwebtoken');

// Middleware para extraer usuario desde el token
const authenticateUser = (req, res, next) => {
  const token = req.cookies?.token; // Extraer el token desde las cookies
  if (!token) {
    return res.status(401).json({ message: 'No autorizado, token requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario en req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

// Middleware para autorización por rol
const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado' });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Acceso denegado para ${req.user.role}` });
    }
    next();
  };
};

module.exports = { authenticateUser, authorize };

