import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./staffform.css"; // Import the CSS file
const StaffForm = () => {
  const [staff, setStaff] = useState({
    name: "",
    empID: "",
    jobName: "",
    email: "",
    phone: "",
    NIC: "",             // Added NIC field
    basicSalary: "",     // Added Basic Salary field
    designation: "",     // Added Designation field
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff({ ...staff, [name]: value });
  };

  // Function to validate only letters
  const handleLettersOnly = (e) => {
    const pattern = /^[A-Za-z\s]*$/; // Allows only letters and spaces
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  // Function to validate only numbers
  const handleNumbersOnly = (e) => {
    const pattern = /^[0-9\b]+$/; // Allows only numbers
    if (!pattern.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!staff.name || !staff.empID || !staff.jobName || !staff.email || !staff.phone || !staff.NIC || !staff.basicSalary || !staff.designation) {
      alert("All fields are required!");
      return;
    }

    // Send a POST request to the backend API
    axios
      .post("http://localhost:3000/api/staff", {
        name: staff.name,
        empID: staff.empID,
        jobName: staff.jobName,
        email: staff.email,
        phone: staff.phone,
        NIC: staff.NIC,              
        basicSalary: staff.basicSalary,  
        designation: staff.designation  
      })
      .then((response) => {
        console.log(response.data);
        navigate("/Admin/staff"); 
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
        <button className="staffsubmit-button" type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default StaffForm;
