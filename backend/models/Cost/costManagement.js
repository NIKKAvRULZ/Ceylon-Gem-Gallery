const mongoose = require("mongoose");

// Define schema for cost management
const costManagementSchema = new mongoose.Schema({
  month: {
    type: Date,
    required: [true, "Month is required"],
  },
  validationCost: {
    type: Number,
    required: [true, "Validation cost is required"],
    min: [0, "Validation cost must be a positive number"],
  },
  cuttingCost: {
    type: Number,
    required: [true, "Cutting cost is required"],
    min: [0, "Cutting cost must be a positive number"],
  },
  salaryCost: {
    type: Number,
    required: [true, "Salary cost is required"],
    min: [0, "Salary cost must be a positive number"],
  },
  additionalCost: {
    type: Number,
    required: [true, "Additional cost is required"],
    min: [0, "Additional cost must be a positive number"],
  },
  profit: {
    type: Number,
    required: [true, "Profit is required"],
    min: [0, "Profit must be a positive number"],
  },
});

module.exports = CostManagement = mongoose.model(
  "costmanagement",
  costManagementSchema
);
