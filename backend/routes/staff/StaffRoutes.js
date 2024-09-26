const express = require("express");
const router = express.Router();

// Import the model
const Staff = require("../../models/Staff/StaffModel");

// Import the controller
const StaffController = require("../../controller/StaffController");

// Define the route to get all users
router.get("/", StaffController.getAllUsers); // Ensure function name matches
router.post("/", StaffController.addUsers); // Corrected function name
router.get("/:id", StaffController.getById);
router.put("/:id", StaffController.updateUser);
router.delete("/:id", StaffController.deleteUser);
// Export the router
module.exports = router;
