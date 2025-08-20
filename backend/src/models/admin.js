const db = require('../../config/db');

const getAllAdmins = () => db('admins').select('id', 'email', 'created_at');
const getAdminById = (id) => db('admins').where({ id }).first();
const createAdmin = (admin) => db('admins').insert(admin);
const updateAdmin = (id, admin) => db('admins').where({ id }).update(admin);
const deleteAdmin = (id) => db('admins').where({ id }).del();

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
