const db = require('../../config/db');

const Product = {
  async getAll() {
    return db('products').select('*');
  },
  async getById(id) {
    return db('products').where({ id }).first();
  },
  async create(product) {
    const [insertedId] = await db('products').insert(product);
    return this.getById(insertedId);
  },
  async update(id, product) {
    await db('products').where({ id }).update(product);
    return this.getById(id);
  },
  async remove(id) {
    return db('products').where({ id }).del();
  },
};

module.exports = Product;
