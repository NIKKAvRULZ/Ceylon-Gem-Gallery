import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./updatetask.css"; // Import CSS for UpdateTask

const UpdateTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState({
    date: "",
    time: "",
    taskDescription: "",
    staffName: "", // Will be fetched and set but not changeable
  });
  const navigate = useNavigate();

  // Fetch the task by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/tasks/${id}`)
      .then((res) => {
        console.log("Task data fetched: ", res.data); // Debugging line to log the fetched task data
        setTask(res.data); // Set task state with fetched data
      })
      .catch((err) => console.error("Error fetching task:", err));
  }, [id]);

  // Handle input change for fields except staffName
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/api/tasks/${id}`, task)
      .then(() => {
        navigate("/Admin/show-task"); // Navigate back to ShowTask page after update
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  return (
    <div className="update-task-container">
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={task.date} onChange={handleChange} required />

        <label>Time:</label>
        <input type="time" name="time" value={task.time} onChange={handleChange} required />

        <label>Task Description:</label>
        <input
          type="text"
          name="taskDescription"
          value={task.taskDescription}
          onChange={handleChange}
          required
        />

        <label>Staff Name:</label>
        <input
          type="text"
          name="staffName"
          value={task.staffName}
          disabled // Make staffName non-editable
        />

        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
