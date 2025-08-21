// PATCH /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatus = ['Dipesan', 'Sudah Dibayar', 'Sudah dikirim'];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid.' });
    }
    const updated = await Order.updateStatus(id, status);
    if (updated === 0) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan.' });
    }
    res.json({ message: 'Status pesanan berhasil diubah.' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengubah status pesanan', error: err.message });
  }
};
// GET /api/orders
exports.getAllOrders = async (req, res) => {
  try {
    // Join orders dengan customers
    const orders = await require('../models/order').getAllWithCustomer();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data order', error: err.message });
  }
};
const Customer = require('../models/customer');
const Order = require('../models/order');

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { name, phone, address, orderItems, total } = req.body;
    if (!name || !phone || !address || !orderItems || !Array.isArray(orderItems)) {
      return res.status(400).json({ message: 'Lengkapi data pembeli dan pesanan.' });
    }
  // Simpan data customer
  const customerId = await Customer.create({ name, wa_number: phone, address });
  // Simpan data order
  const orderId = await Order.create({ customer_id: customerId, cart_items: JSON.stringify(orderItems), total });
    // Simpan detail order (jika ada tabel order_items, bisa ditambahkan di sini)
    // ...
    res.status(201).json({ message: 'Pesanan berhasil disimpan', orderId });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menyimpan pesanan', error: err.message });
  }
};
