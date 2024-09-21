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
    },

    Password: {
        type: String,
        required: true,
    },
});

module.exports = Customer = mongoose.model("coustomer", CustomerSchema);