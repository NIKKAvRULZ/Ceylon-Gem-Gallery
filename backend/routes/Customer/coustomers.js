const express = require("express");

const router = express.Router();

const Customers = require("../../models/Customer/customer");

//test
router.get("/test", (req, res) => res.send("Customer routes working"));

router.post("/", (req, res) => {
    Customers.create(req.body)
    .then(() => res.json({msg: "Customer add successfully"}))
    .catch(() => res.status(400).json({msg: "Customer adding fail"}));
});

router.get("/", (req, res) => {
    Customers.find()
    .then((coustomers) => res.json(coustomers))
    .catch(() => res.status(400).json({ msg: "No customers fount" }));
});

router.get("/:id", (req, res) => {
    Customers
    .findById(req.params.id)
    .then((coustomers) => res.json(coustomers))
    .catch(() => res.status(400).json({msg: "cannot find this customer"}))
});

router.put("/:id", (req, res) => {
    Customers.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.json({ msg: "Update successfully." });
        })
        .catch(() => {
            res.status(400).json({ msg: "Update failed." });
        });
});

router.delete("/:id", (req, res) => {
    Customers.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Deleted successfully." }))
        .catch(() => res.status(400).json({ msg: "Cannot be deleted" }));
});


module.exports = router;