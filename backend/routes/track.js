const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET Track Order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) throw new Error('Order not found');

    res.json(order.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
