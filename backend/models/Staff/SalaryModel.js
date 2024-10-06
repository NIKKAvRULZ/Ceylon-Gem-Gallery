// SalaryModel.js
const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  empID: { type: String, required: true },
  name: { type: String, required: true },
  month: { type: String, required: true },
  date: { type: String, required: true },
  year: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  bonus: { type: Number, required: true },
  overtime: { type: Number, required: true },
  additionalCosts: { type: Number, required: true },
  totalSalary: { type: Number, required: true }, // Computed field
});

const Salary = mongoose.model('Salary', SalarySchema);
module.exports = Salary;
