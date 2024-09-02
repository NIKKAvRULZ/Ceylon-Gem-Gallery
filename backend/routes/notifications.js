const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// GET Notifications for User
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
