const express = require('express');
const router = express.Router();
const Cut = require('../models/Cut/Cut'); // Ensure the path is correct
const Worker = require('../models/Worker');

// POST Assign Worker to Cut
router.post('/', async (req, res) => {
  try {
    const { cutId, workerId, customerId } = req.body;

    const worker = await Worker.findById(workerId);
    if (!worker) throw new Error('Worker not found');

    // Update worker workload
    worker.workload += 1;
    await worker.save();

    // Find the cut and assign the worker
    const cut = await Cut.findById(cutId);
    if (!cut) throw new Error('Cut not found');

    cut.assignedWorker = workerId; // Assuming you have a field in the Cut model
    cut.customerId = customerId; // Assuming you want to track the customer as well
    await cut.save();

    res.json({ message: 'Worker assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
