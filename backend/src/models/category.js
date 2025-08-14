const db = require('../../config/db');

const Category = {
  getAll: () => db('categories').select('*'),
  getById: (id) => db('categories').where({ id }).first(),
  create: (data) => db('categories').insert(data),
  update: (id, data) => db('categories').where({ id }).update(data),
  delete: (id) => db('categories').where({ id }).del(),
};

module.exports = Category;
