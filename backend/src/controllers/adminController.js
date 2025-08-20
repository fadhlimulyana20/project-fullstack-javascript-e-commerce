const bcrypt = require('bcrypt');
const Admin = require('../models/admin');

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.getAllAdmins();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.createAdmin({ email, password: hashedPassword });
    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const updateData = { email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    await Admin.updateAdmin(id, updateData);
    res.json({ message: 'Admin updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.deleteAdmin(id);
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
};
