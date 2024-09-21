const mongoose = require('mongoose');

const trackOrderSchema = new mongoose.Schema({
  workerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  cutID: { type: mongoose.Schema.Types.ObjectId, ref: 'Cut', required: true },
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  trackingID: { type: String, unique: true, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TrackOrder', trackOrderSchema);
