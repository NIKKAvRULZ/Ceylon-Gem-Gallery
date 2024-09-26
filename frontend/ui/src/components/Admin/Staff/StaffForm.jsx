import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./staffform.css"; // Import the CSS file

const StaffForm = () => {
  const [staff, setStaff] = useState({
    name: "",
    empID: "",
    jobName: "",
    email: "",    // Add email field
    phone: "",    // Add phone field
  });

  const navigate = useNavigate(); // Define navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!staff.name || !staff.empID || !staff.jobName || !staff.email || !staff.phone) {
      alert("All fields are required!");
      return;
    }

    // Send a POST request to the backend API
    axios
      .post("http://localhost:3000/api/staff", {
        name: staff.name,
        empID: staff.empID,
        jobName: staff.jobName,
        email: staff.email,    // Include email
        phone: staff.phone,    // Include phone
      })
      .then((response) => {
        console.log(response.data);
        navigate("/Admin/staff"); // Use navigate to redirect
      })
      .catch((error) => {
        console.error("There was an error adding the staff!", error);
      });
  };

  return (
    <div className="staffform-container">
      <form onSubmit={handleSubmit}>
        <label className="staffform-label" htmlFor="name">Name</label>
        <input
          className="staffform-input"
          type="text"
          name="name"
          value={staff.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <label className="staffform-label" htmlFor="empID">Employee ID</label>
        <input
          className="staffform-input"
          type="number"
          name="empID"
          value={staff.empID}
          onChange={handleChange}
          placeholder="Employee ID"
          required
        />
        <label className="staffform-label" htmlFor="jobName">Job Name</label>
        <input
          className="staffform-input"
          type="text"
          name="jobName"
          value={staff.jobName}
          onChange={handleChange}
          placeholder="Job Name"
          required
        />
        <label className="staffform-label" htmlFor="email">Email</label> {/* Added Email label */}
        <input
          className="staffform-input"
          type="email"
          name="email"
          value={staff.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <label className="staffform-label" htmlFor="phone">Phone</label> {/* Added Phone label */}
        <input
          className="staffform-input"
          type="tel"
          name="phone"
          value={staff.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <button className="staffsubmit-button" type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default StaffForm;
