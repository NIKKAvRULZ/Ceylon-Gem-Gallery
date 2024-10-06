import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./updatestaff.css"; // Import the CSS file

const UpdateStaff = () => {
  const { id } = useParams(); // Get the staff ID from the URL
  const [staff, setStaff] = useState({
    name: "",
    empID: "",
    jobName: "",
    email: "",
    phone: "",
    NIC: "",
    basicSalary: "",
    designation: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the staff data by ID when the component is mounted
    axios
      .get(`http://localhost:3000/api/staff/${id}`)
      .then((res) => setStaff(res.data.user))
      .catch((err) => console.log("Error fetching staff data:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update staff details via PUT request
    axios
      .put(`http://localhost:3000/api/staff/${id}`, staff)
      .then(() => {
        navigate("/Admin/staff"); // Redirect to the staff list after updating
      })
      .catch((err) => console.log("Error updating staff:", err));
  };

  // Function to restrict input to letters only
  const handleLettersOnly = (e) => {
    const pattern = /^[A-Za-z\s]*$/; // Allows only letters and spaces
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  // Function to restrict input to numbers only
  const handleNumbersOnly = (e) => {
    const pattern = /^[0-9\b]+$/; // Allows only numbers
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="staffform-container">
      <h2>Update Staff</h2>
      <form onSubmit={handleSubmit}>
        <label className="staffform-label" htmlFor="name">Name</label>
        <input
          className="staffform-input"
          type="text"
          name="name"
          value={staff.name}
          onChange={handleChange}
          placeholder="Name"
          onKeyPress={handleLettersOnly} // Restrict to letters only
          required
        />

        <label className="staffform-label" htmlFor="empID">Employee ID</label>
        <input
          className="staffform-input"
          type="text"
          name="empID"
          value={staff.empID}
          onChange={handleChange}
          placeholder="Employee ID"
          onKeyPress={handleNumbersOnly} // Restrict to numbers only
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
          onKeyPress={handleLettersOnly} // Restrict to letters only
          required
        />

        <label className="staffform-label" htmlFor="email">Email</label>
        <input
          className="staffform-input"
          type="email"
          name="email"
          value={staff.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <label className="staffform-label" htmlFor="phone">Phone</label>
        <input
          className="staffform-input"
          type="text"
          name="phone"
          value={staff.phone}
          onChange={handleChange}
          placeholder="Phone"
          onKeyPress={handleNumbersOnly} // Restrict to numbers only
          required
        />

        <label className="staffform-label" htmlFor="NIC">NIC</label>
        <input
          className="staffform-input"
          type="text"
          name="NIC"
          value={staff.NIC}
          onChange={handleChange}
          placeholder="NIC"
          onKeyPress={handleNumbersOnly} // Restrict to numbers only
          required
        />

        <label className="staffform-label" htmlFor="basicSalary">Basic Salary</label>
        <input
          className="staffform-input"
          type="text"
          name="basicSalary"
          value={staff.basicSalary}
          onChange={handleChange}
          placeholder="Basic Salary"
          onKeyPress={handleNumbersOnly} // Restrict to numbers only
          required
        />

        <label className="staffform-label" htmlFor="designation">Designation</label>
        <input
          className="staffform-input"
          type="text"
          name="designation"
          value={staff.designation}
          onChange={handleChange}
          placeholder="Designation"
          onKeyPress={handleLettersOnly} // Restrict to letters only
          required
        />

        <button className="staffsubmit-button" type="submit">Update Staff</button>
      </form>
    </div>
  );
};

export default UpdateStaff;
