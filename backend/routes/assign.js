const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const Job = require('../models/Job');

const generateTrackingID = () => {
  return 'TRACK-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 9).toUpperCase();
};

router.post('/assign', async (req, res) => {
  const { workerID, cutID, customerID } = req.body;

  try {
    let worker = await Worker.findById(workerID);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    worker.workload += 1;
    worker.experience += 1;
    await worker.save();

    const newJob = new Job({
      workerID,
      cutID,
      customerID,
      status: 'Assigned',
      trackingID: generateTrackingID(),
    });
    await newJob.save();

    res.status(201).json({ message: 'Job assigned successfully', worker, job: newJob });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
