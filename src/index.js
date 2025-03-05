const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importar y usar rutas
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error en conexión:', err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});
