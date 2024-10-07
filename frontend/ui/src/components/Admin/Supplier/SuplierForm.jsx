import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Suplierform.css";

const SupForm = () => {
  const [sup, setsup] = useState({
    name: "",
    company: "",
    phoneNo: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({}); // State for handling errors
  const navigate = useNavigate();

  // Regular expression for name and company validation (letters only)
  const lettersPattern = /^[A-Za-z\s]*$/; // Allow only letters and spaces

  // Regular expression for phone number validation (numbers only)
  const phonePattern = /^[0-9]*$/; // Allow only digits

  // Email pattern for basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input based on the field
    if (name === "name" || name === "company") {
      // Allow only letters and spaces in the Name and Company fields
      if (!lettersPattern.test(value)) {
        return; // Do not update state if invalid
      }
    } else if (name === "phoneNo") {
      // Allow only digits in the Phone Number field
      if (!phonePattern.test(value)) {
        return; // Do not update state if invalid
      }
    }

    setsup({ ...sup, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = {};

    // Name validation (letters only)
    if (!lettersPattern.test(sup.name)) {
      validationErrors.name = "Name can only contain letters and spaces.";
    } else if (sup.name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters long.";
    }

    // Company validation (letters only)
    if (!lettersPattern.test(sup.company)) {
      validationErrors.company = "Company can only contain letters and spaces.";
    } else if (sup.company.length < 3) {
      validationErrors.company = "Company must be at least 3 characters long.";
    }

    // Phone number validation (numbers only, and must be 10 digits)
    if (!phonePattern.test(sup.phoneNo)) {
      validationErrors.phoneNo = "Phone number can only contain digits.";
    } else if (sup.phoneNo.length !== 10) {
      validationErrors.phoneNo = "Phone number must be exactly 10 digits long.";
    }

    // Email validation (basic email pattern check)
    if (!emailPattern.test(sup.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    // Address validation (not empty, at least 5 characters)
    if (!sup.address.trim()) {
      validationErrors.address = "Address field is required.";
    } else if (sup.address.length < 5) {
      validationErrors.address = "Address must be at least 5 characters long.";
    }

    setErrors(validationErrors);

    // Return true if no errors, otherwise false
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    // Send a POST request to the backend API if form is valid
    axios
      .post("http://localhost:3000/sup", {
        name: sup.name,
        company: sup.company,
        phoneNo: sup.phoneNo,
        email: sup.email,
        address: sup.address,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/Admin/suplier-list");
      })
      .catch((error) => {
        console.error("There was an error adding the suplier!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={sup.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="company"
          value={sup.company}
          onChange={handleChange}
          placeholder="Company"
          required
        />
        {errors.company && <span className="error-message">{errors.company}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="phoneNo"
          value={sup.phoneNo}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        {errors.phoneNo && <span className="error-message">{errors.phoneNo}</span>}
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          value={sup.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="address"
          value={sup.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        {errors.address && <span className="error-message">{errors.address}</span>}
      </div>

      <button type="submit">Add Suplier</button>
    </form>
  );
};

export default SupForm;
