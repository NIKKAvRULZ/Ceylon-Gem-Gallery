const express = require("express");
const router = express.Router();

// Import the controller
const supController = require("../../controller/supController");

// Define routes
router.get("/", supController.getAllUsers);
router.post("/", supController.addUsers);
router.get("/:id", supController.getById);
router.put("/:id", supController.updateUser);
router.delete("/:id", supController.deleteUser);

module.exports = router;
