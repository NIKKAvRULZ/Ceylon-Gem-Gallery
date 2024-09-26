const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empID: { type: String, required: true },
  jobName: { type: String, required: true },
  email: { type: String, required: true },  // Email field
  phone: { type: String, required: true }   // Phone field
});

const Staff = mongoose.model('Staff', StaffSchema);
module.exports = Staff;
