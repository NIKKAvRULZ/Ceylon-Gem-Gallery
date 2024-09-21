const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  workerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  jobID: { type: String, required: true },
  customerID: { type: String, required: true },
  status: { type: String, enum: ['Assigned', 'In Progress', 'Completed'], default: 'Assigned' },
  trackingID: { type: String, required: true },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
