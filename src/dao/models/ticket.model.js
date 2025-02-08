const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Para generar un código único

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: () => uuidv4().slice(0, 8), // Código autogenerado (8 caracteres únicos)
  },
  purchase_datetime: {
    type: Date,
    default: Date.now, // Guarda la fecha y hora exacta
  },
  amount: {
    type: Number,
    required: true, // Total de la compra
  },
  purchaser: {
    type: String,
    required: true, // Email del comprador
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
