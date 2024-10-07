const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    Fname: {
      type: String,
      required: true,
    },
  
    Lname: {
      type: String,
      required: true,
    },
  
    Email: {
      type: String,
      required: true,
      unique: true,
    },
  
    Password: {
      type: String,
      required: true,
    },
  
    profileImage: { type: String } 
});

const Customer = mongoose.model("customer", CustomerSchema);
module.exports = Customer;
