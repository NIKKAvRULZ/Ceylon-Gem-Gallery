const express = require('express');
const router = express.Router();
const TrackOrder = require('../models/TrackOrder'); // Import the model
const Worker = require('../models/Worker');
const Cut = require('../models/Cut/Cut');
const Customer = require('../models/Customer/customer');

// POST Assign Job (Worker to Cut and Customer)
router.post('/', async (req, res) => {
  try {
    const { cutId, workerId, customerId } = req.body;

    // Find the worker
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' });
    }

    // Find the cut
    const cut = await Cut.findById(cutId);
    if (!cut) {
      return res.status(404).json({ message: 'Cut not found' });
    }

    // Find the customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create a new job tracking entry
    const newTrackOrder = new TrackOrder({
      workerID: workerId,
      cutID: cutId,
      customerID: customerId,
      trackingID: `TRACK-${Math.random().toString(36).substring(2, 8)}`, // Generate a random tracking ID
      status: 'Assigned',
    });

    // Save the new tracking entry
    await newTrackOrder.save();

    // Update the worker's workload or any additional logic
    worker.workload = (worker.workload || 0) + 1;
    await worker.save();

    // Save the changes and send a success response
    res.status(201).json({ message: 'Job assigned successfully', trackOrder: newTrackOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign job', error: error.message });
  }
});

// GET route to fetch all job tracking records
router.get('/', async (req, res) => {
  try {
    const trackOrders = await TrackOrder.find()
      .populate('workerID', 'name') // Populate worker details
      .populate('cutID') // Populate cut details
      .populate('customerID', 'Fname Lname'); // Populate customer details

    res.status(200).json(trackOrders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job records', error: error.message });
  }
});

// GET route to fetch job details by tracking ID
router.get('/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;
    const trackOrder = await TrackOrder.findOne({ trackingID })
      .populate('workerID', 'name')
      .populate('cutID')
      .populate('customerID', 'Fname Lname');

    if (!trackOrder) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ job: trackOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job details', error: error.message });
  }
});


module.exports = router;
