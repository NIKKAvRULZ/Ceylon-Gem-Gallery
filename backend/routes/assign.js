const express = require('express');
const router = express.Router();
const Cut = require('../models/cut');
const Worker = require('../models/Worker');

// POST Assign Worker to Cut
router.post('/', async (req, res) => {
  try {
    const { cutId, workerId } = req.body;

    const worker = await Worker.findById(workerId);
    if (!worker) throw new Error('Worker not found');

    worker.workload += 1;
    await worker.save();

    // Here you can add logic to link the worker with the specific cut
    res.json({ message: 'Worker assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
