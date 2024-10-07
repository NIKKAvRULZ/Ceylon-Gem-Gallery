const express = require("express");
const router = express.Router();
const SalaryController = require("../../controller/SalaryController");

router.post("/add", SalaryController.addSalary);
router.get("/", SalaryController.getAllSalaries);
router.put("/:id", SalaryController.updateSalary);
router.delete("/:id", SalaryController.deleteSalary);

module.exports = router;
