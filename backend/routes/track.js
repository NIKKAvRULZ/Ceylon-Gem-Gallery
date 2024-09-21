const express = require('express');
const router = express.Router();

// GET Track Order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) throw new Error('Gem Cut not found');

    res.json(order.progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
