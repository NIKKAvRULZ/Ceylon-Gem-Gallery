const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  taskDescription: { type: String, required: true },
  staffName: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);

