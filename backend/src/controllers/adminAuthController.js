const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  try {
    const existing = await db('admins').where({ email }).first();
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const [id] = await db('admins').insert({ email, password: hashed });
    res.status(201).json({ id, email });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  try {
    const admin = await db('admins').where({ email }).first();
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { register, login };
