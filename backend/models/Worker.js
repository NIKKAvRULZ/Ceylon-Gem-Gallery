const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: String, required: true },
  experience: { type: Number, required: true },
  workload: { type: Number, default: 0 },
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
