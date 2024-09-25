const mongoose = require("mongoose");

// Define schema
const costSchema = new mongoose.Schema({
  cardHName: {
    type: String,
    required: [true, "Card holder name is required"],
    minlength: [1, "Card holder name cannot be empty"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  district: {
    type: String,
    required: [true, "Amount is required"],
    match: [
      /^\$\d+(\.\d{1,2})?$/,
      "Please enter a valid amount starting with a $ sign (e.g., $100.00)",
    ],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  postalCode: {
    type: String,
    required: [true, "Postal code is required"],
  },
  cardNo: {
    type: String,
    required: [true, "Card number is required"],
    match: [/^\d{16}$/, "Card number must be 16 digits"],
  },
  expireDate: {
    type: Date,
    required: [true, "Expiration date is required"],
    validate: {
      validator: function (value) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1; // Month is zero-indexed
        const expireYear = value.getFullYear();
        const expireMonth = value.getMonth() + 1;

        // Ensure the expiration date is in the future
        return (
          expireYear > currentYear ||
          (expireYear === currentYear && expireMonth > currentMonth)
        );
      },
      message: "Expiration date must be in a future month",
    },
  },
  cvc: {
    type: String,
    required: [true, "CVC is required"],
    match: [/^\d{3}$/, "CVC must be 3 digits"],
  },
  paymentType: {
    type: String,
    enum: ["Credit card", "Debit card"],
    required: [true, "Payment type is required"],
  },
});

module.exports = CostPay = mongoose.model("costpay", costSchema);
