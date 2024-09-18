const mongoose = require("mongoose");

const CoustomerSchema = new mongoose.Schema({
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

module.exports = Coustomer = mongoose.model("coustomer", CoustomerSchema);