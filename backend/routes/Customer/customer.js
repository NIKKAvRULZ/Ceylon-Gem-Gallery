const express = require("express");
const router = express.Router();
const Customers = require("../../models/Customer/customer");

// Test route
router.get("/test", (req, res) => res.send("Customer routes working"));

// Create a new customer
router.post("/", (req, res) => {
    Customers.create(req.body)
        .then(() => res.json({ msg: "Customer added successfully" }))
        .catch(() => res.status(400).json({ msg: "Customer adding failed" }));
});

// Get all customers
router.get("/", (req, res) => {
    Customers.find()
        .then((customers) => res.json(customers))
        .catch(() => res.status(400).json({ msg: "No customers found" }));
});

// Get a customer by ID
router.get("/:id", (req, res) => {
    Customers.findById(req.params.id)
        .then((customer) => res.json(customer))
        .catch(() => res.status(400).json({ msg: "Cannot find this customer" }));
});

// Update a customer by ID
router.put("/:id", (req, res) => {
    Customers.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ msg: "Update successfully." }))
        .catch(() => res.status(400).json({ msg: "Update failed." }));
});

// Delete a customer by ID
router.delete("/:id", (req, res) => {
    Customers.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Deleted successfully." }))
        .catch(() => res.status(400).json({ msg: "Cannot be deleted" }));
});

module.exports = router;
