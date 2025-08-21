  // ...existing code...
const db = require('../../config/db');

const Order = {
  async create(data) {
    const [id] = await db('orders').insert(data).returning('id');
    return id;
  },
  async findById(id) {
    return db('orders').where({ id }).first();
  },

  // Ambil semua order beserta data customer
  async getAllWithCustomer() {
    return db('orders')
      .leftJoin('customers', 'orders.customer_id', 'customers.id')
      .select(
        'orders.id',
        'orders.created_at',
        'orders.total',
        'orders.cart_items',
        'orders.status',
        'customers.name as customer_name',
        'customers.wa_number',
        'customers.address'
      )
      .orderBy('orders.id', 'desc');
  },

  async updateStatus(id, status) {
    return db('orders').where({ id }).update({ status });
  }
};

module.exports = Order;
