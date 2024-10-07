import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ShowTask.css';

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks from the backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  // Handle delete task
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  // Handle update task (navigating to update page)
  const handleUpdate = (id) => {
    navigate(`/Admin/update-t/${id}`);
  };

  return (
    <div className="show-task-container">
      <h2 className="show-task-title">Show Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Task Description</th>
            <th>Staff Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.date}</td>
              <td>{task.time}</td>
              <td>{task.taskDescription}</td>
              <td>{task.staffName}</td>
              <td>
                <button className="show-task-button update-btn" onClick={() => handleUpdate(task._id)}>Update</button>
                <button className="show-task-delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="show-task-button-back-btn" onClick={() => navigate("/Admin/staff")}>Back to Staff List</button>
    </div>
  );
};

export default ShowTask;
