const express = require("express");
const router = express.Router();
const TaskController = require("../../controller/TaskController"); // Import the TaskController

// Route to create a task (handled by the TaskController)
router.post("/", TaskController.AddTask);

// Route to get all tasks (handled by the TaskController)
router.get("/", TaskController.getTasks);

router.put("/:id", TaskController.updateTask);

// Route to delete a task
router.delete("/:id", TaskController.deleteTask);


module.exports = router;
