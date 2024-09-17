const express = require("express");

const router = express.Router();
const Employees = require("../models/employee");
const { json } = require("body-parser");

// Test route
router.get("/test", (req, res) => res.send("Employee Routes Working"));

// Create a new employee
router.post("/", (req, res) => {
    Employees.create(req.body)
        .then(() => res.json({ msg: "Employee Added Successfully" }))
        .catch(() => res.status(400).json({ msg: "Employee Adding Failed" }));
});

// Get all employees
router.get("/", (req, res) => {
    Employees.find()
        .then((employees) => res.json(employees))
        .catch(() => res.status(400).json({ msg: "No Employees Found" }));
});

// Get employee by ID
router.get("/:id", (req, res) => {
    Employees.findById(req.params.id)
        .then((employee) => res.json(employee))
        .catch(() => res.status(400).json({ msg: "Cannot find this employee" }));
});

// Update employee by ID
router.put("/:id", (req, res) => {
    Employees.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ msg: "Updated Successfully" }))
        .catch(() => res.status(400).json({ msg: "Update Failed" }));
});

// Delete employee by ID
router.delete("/:id", (req, res) => {
    Employees.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Deleted Successfully" }))
        .catch(() => res.status(400).json({ msg: "Cannot be deleted" }));
});

module.exports = router;
