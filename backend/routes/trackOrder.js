const express = require('express');
const router = express.Router();
const TrackOrder = require('../models/TrackOrder'); // Adjust the path as necessary

// Assign a job to a worker
router.post('/assign', async (req, res) => {
  const { workerId, cutId, customerId } = req.body;

  try {
    const newJob = new TrackOrder({
      workerID: workerId,
      cutID: cutId,
      customerID: customerId,
      trackingID: generateTrackingID(), // Function to generate a unique tracking ID
      status: 'Assigned', // Set initial status
    });

    await newJob.save();
    res.status(201).json({ message: 'Job assigned successfully', job: newJob });
  } catch (error) {
    res.status(400).json({ message: 'Error assigning job', error: error.message });
  }
});

// Function to generate a unique tracking ID
const generateTrackingID = () => {
  return `TRACK-${Math.random().toString(36).substr(2, 9)}`; // Simple random ID generator
};

module.exports = router;
