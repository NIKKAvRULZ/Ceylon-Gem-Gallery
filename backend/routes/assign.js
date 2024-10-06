// Assuming this is part of your existing Express setup
const express = require('express');
const router = express.Router();
const TrackOrder = require('../models/TrackOrder'); // Adjust the path as needed
const Worker = require('../models/Worker');

// POST route to complete a job using tracking ID
router.post('/complete/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;

    // Find the job using tracking ID
    const job = await TrackOrder.findOne({ trackingID });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update job status
    job.status = 'Completed'; // Set the status to completed
    await job.save();

    res.json({ message: 'Job completed successfully', job });
  } catch (error) {
    res.status(500).json({ message: 'Error completing job', error: error.message });
  }
});

module.exports = router;
