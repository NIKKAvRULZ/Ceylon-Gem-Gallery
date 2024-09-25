const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  employeeID: { type: String, required: true },
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  workload: { type: Number, default: 0 },
  address: { type: String },
  nic: { type: String, required: true },
});

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
