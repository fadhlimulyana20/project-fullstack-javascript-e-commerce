const db = require('../../config/db');

const Customer = {
  async create(data) {
    const [id] = await db('customers').insert(data).returning('id');
    return id;
  },
  async findById(id) {
    return db('customers').where({ id }).first();
  }
};

module.exports = Customer;
