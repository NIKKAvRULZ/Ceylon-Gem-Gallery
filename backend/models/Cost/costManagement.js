const mongoose = require("mongoose");

// Define schema for cost management
const costManagementSchema = new mongoose.Schema({
  month: {
    type: String,
    required: [true, "Month is required"],
    match: [
      /^(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i,
      "Please enter a valid month name (e.g., January, Feb, etc.)",
    ],
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
