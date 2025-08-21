const db = require('../../config/db');

const Order = {
  async create(data) {
    const [id] = await db('orders').insert(data).returning('id');
    return id;
  },
  async findById(id) {
    return db('orders').where({ id }).first();
  }
};

module.exports = Order;
