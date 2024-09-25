const express = require("express");
const router = express.Router();
const Costs = require("../../models/Cost/costManagement");

// Test route
router.get("/test", (req, res) => res.send("Cost Management Route is working"));

// Create a new cost record
// Create a new cost record
router.post("/", (req, res) => {
  const {
    month,
    validationCost,
    cuttingCost,
    salaryCost,
    additionalCost,
    profit,
  } = req.body;

  const costRecord = new Costs({
    month: new Date(month), // Convert to Date
    validationCost,
    cuttingCost,
    salaryCost,
    additionalCost,
    profit,
  });

  costRecord
    .save()
    .then(() => res.json({ msg: "Cost added successfully" }))
    .catch(() => res.status(400).json({ msg: "Cost adding failed" }));
});

router.get("/", (req, res) => {
  Costs.find()
    .then((costs) => {
      // Manually calculate totalCost and netProfit for each record
      const costsWithCalculations = costs.map((cost) => {
        const totalCost =
          cost.validationCost +
          cost.cuttingCost +
          cost.salaryCost +
          cost.additionalCost;
        const netProfit = cost.profit - totalCost;
        return {
          ...cost._doc, // Spread the existing cost fields
          totalCost, // Add calculated totalCost
          netProfit, // Add calculated netProfit
        };
      });

      // Send back the updated costs with manual calculations
      res.json(costsWithCalculations);
    })
    .catch((err) => res.status(400).json({ msg: "No Costs Found" }));
});

router.get("/:id", (req, res) => {
  Costs.findById(req.params.id)
    .lean({ virtuals: true })
    .then((cost) => {
      console.log("Total Cost:", cost.totalCost);
      console.log("Net Profit:", cost.netProfit);
      res.json(cost);
    })
    .catch(() => res.status(400).json({ msg: "Cost not found" }));
});

// Update a cost record by ID
router.put("/:id", (req, res) => {
  Costs.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ msg: "Cost updated successfully" }))
    .catch(() => res.status(400).json({ msg: "Cost update failed" }));
});

// Delete a cost record by ID
router.delete("/:id", (req, res) => {
  Costs.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "Cost deleted successfully" }))
    .catch(() => res.status(400).json({ msg: "Cost deletion failed" }));
});

module.exports = router;
