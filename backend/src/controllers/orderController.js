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
