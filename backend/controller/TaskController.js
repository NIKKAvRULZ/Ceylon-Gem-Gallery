// controllers/TaskController.js
const Task = require("../models/Staff/TaskModel");

// Create a new task
const AddTask = async (req, res) => {
  const { date, time, taskDescription, staffName } = req.body;
  const task = new Task({ date, time, taskDescription, staffName });

  try {
    await task.save(); // Save task to database
    res.status(201).json(task); // Respond with the created task
  } catch (error) {
    res.status(500).json({ message: "Failed to assign task", error });
  }
};

// Retrieve all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks
    res.status(200).json(tasks); // Respond with all tasks
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tasks", error });
  }
};
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { date, time, taskDescription, staffName } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { date, time, taskDescription, staffName },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully", deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};

// Export the controller functions
module.exports = {
  AddTask,
  getTasks,
  updateTask,
  deleteTask,
};
