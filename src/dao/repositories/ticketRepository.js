const Ticket = require('../dao/models/ticket.model');

class TicketRepository {
  async createTicket(ticketData) {
    return await Ticket.create(ticketData);
  }
}

module.exports = new TicketRepository();
