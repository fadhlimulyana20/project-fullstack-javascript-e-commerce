const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Update status pesanan
router.patch('/:id/status', orderController.updateOrderStatus);

// Ambil semua order
router.get('/', orderController.getAllOrders);

// Buat order baru
router.post('/', orderController.createOrder);

module.exports = router;
