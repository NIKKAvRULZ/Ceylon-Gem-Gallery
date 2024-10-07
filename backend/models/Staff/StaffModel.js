const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empID: { type: String, required: true },
  jobName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  NIC: { type: String, required: true },            // Added NIC
  basicSalary: { type: Number, required: true },     // Added Basic Salary
  designation: { type: String, required: true }      // Added Designation
});

const Staff = mongoose.model('Staff', StaffSchema);
module.exports = Staff;
