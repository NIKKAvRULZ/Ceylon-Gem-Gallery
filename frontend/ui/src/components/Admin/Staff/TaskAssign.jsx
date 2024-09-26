import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./TaskAssign.css"; // Import CSS for TaskAssign

const TaskAssign = () => {
  const { id } = useParams(); // Get staff member ID from the URL
  const [task, setTask] = useState({
    date: "",
    time: "",
    taskDescription: "", // Will be replaced with dropdown
    staffName: "",
  });
  const navigate = useNavigate();

  // Fetch staff member name by ID
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/staff/${id}`)
      .then((res) => setTask({ ...task, staffName: res.data.user.name }))
      .catch((err) => console.log("Error fetching staff:", err));
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/tasks", task) // POST task to backend
      .then(() => {
        console.log("Task assigned");
        navigate("/Admin/show-task");
      })
      .catch((err) => console.log("Error assigning task:", err));
  };

  return (
    <div className="task-assign-container">
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={task.date} onChange={handleChange} required />

        <label>Time:</label>
        <input type="time" name="time" value={task.time} onChange={handleChange} required />

        <label>Task:</label>
        <select name="taskDescription" value={task.taskDescription} onChange={handleChange} required>
          <option value="">Select a task</option>
          <option value="Gem Cutter">Gem Cutter</option>
          <option value="Gem Polisher">Gem Polisher</option>
          <option value="Developer">Developer</option>
          <option value="Administrator">Administrator</option>
        </select>

        <label>Staff Member:</label>
        <input type="text" name="staffName" value={task.staffName} disabled />

        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default TaskAssign;
