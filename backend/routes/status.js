const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// POST Update Task Status
router.post('/update', async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) throw new Error('Task not found');

    task.status = status;
    await task.save();

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
