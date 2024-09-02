const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    employeeID:{
        type: String,
        required: true,
    },
    name:{
        type: String,
    },
    address:{
        type: String,
    },
    nic:{
        type: String,
        required: true,
    },
});

module.exports = Employee = mongoose.model("employee",EmployeeSchema);