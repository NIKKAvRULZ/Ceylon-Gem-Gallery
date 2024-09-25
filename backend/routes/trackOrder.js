const express = require('express');
const router = express.Router();
const TrackOrder = require('../models/TrackOrder'); // Adjust the path as needed

// POST route to complete a job using tracking ID
router.post('/complete/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;
    console.log(`Received request to complete job with tracking ID: ${trackingID}`);

    // Find the job using tracking ID
    const job = await TrackOrder.findOne({ trackingID });
    if (!job) {
      console.log('Job not found');
      return res.status(404).json({ message: 'Job not found' });
    }

    // Update job status to completed
    job.status = 'Completed';
    await job.save();

    console.log(`Job with tracking ID: ${trackingID} marked as completed.`);

    res.json({ message: 'Job completed successfully', job });
  } catch (error) {
    console.error('Error completing job:', error);
    res.status(500).json({ message: 'Error completing job', error: error.message });
  }
});

// DELETE route to remove a job from the database using tracking ID
router.delete('/:trackingID', async (req, res) => {
  try {
    const { trackingID } = req.params;
    console.log(`Received request to delete job with tracking ID: ${trackingID}`);

    // Find and delete the job using tracking ID
    const result = await TrackOrder.deleteOne({ trackingID });
    if (result.deletedCount === 0) {
      console.log('Job not found');
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log(`Job with tracking ID: ${trackingID} deleted successfully.`);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job', error: error.message });
  }
});

// Route to get all incomplete jobs
router.get('/incomplete', async (req, res) => {
  try {
    const jobs = await TrackOrder.find({ status: { $ne: 'Completed' } }); // Fetch jobs not marked as 'Completed'
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
});

module.exports = router;
