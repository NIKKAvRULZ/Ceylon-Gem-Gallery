const express = require("express");
const router = express.Router();

// Insert User Controller
const UserController = require("../../controller/UserController");

// Define Routes
router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUsers);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deletUser);
// Export
module.exports = router;
