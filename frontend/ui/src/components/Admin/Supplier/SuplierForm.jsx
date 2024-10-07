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

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const lettersPattern = /^[A-Za-z\s]*$/;
  const phonePattern = /^[0-9]*$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" || name === "company") {
      if (!lettersPattern.test(value)) {
        return;
      }
    } else if (name === "phoneNo") {
      if (!phonePattern.test(value)) {
        return;
      }
    }
    setsup({ ...sup, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!lettersPattern.test(sup.name)) {
      validationErrors.name = "Name can only contain letters and spaces.";
    } else if (sup.name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters long.";
    }

    if (!lettersPattern.test(sup.company)) {
      validationErrors.company = "Company can only contain letters and spaces.";
    } else if (sup.company.length < 3) {
      validationErrors.company = "Company must be at least 3 characters long.";
    }

    if (!phonePattern.test(sup.phoneNo)) {
      validationErrors.phoneNo = "Phone number can only contain digits.";
    } else if (sup.phoneNo.length !== 10) {
      validationErrors.phoneNo = "Phone number must be exactly 10 digits long.";
    }

    if (!emailPattern.test(sup.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!sup.address.trim()) {
      validationErrors.address = "Address field is required.";
    } else if (sup.address.length < 5) {
      validationErrors.address = "Address must be at least 5 characters long.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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
    <div className="supform-container">
      <form onSubmit={handleSubmit}>
        <div className="supform-group">
          <label htmlFor="name" className="supform-label">Name</label>
          <input
            type="text"
            className="supform-input-name"
            name="name"
            value={sup.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          {errors.name && <span className="supform-error">{errors.name}</span>}
        </div>

        <div className="supform-group">
          <label htmlFor="company" className="supform-label">Company</label>
          <input
            type="text"
            className="supform-input-company"
            name="company"
            value={sup.company}
            onChange={handleChange}
            placeholder="Company"
            required
          />
          {errors.company && <span className="supform-error">{errors.company}</span>}
        </div>

        <div className="supform-group">
          <label htmlFor="phoneNo" className="supform-label">Phone Number</label>
          <input
            type="text"
            className="supform-input-phoneNo"
            name="phoneNo"
            value={sup.phoneNo}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          {errors.phoneNo && <span className="supform-error">{errors.phoneNo}</span>}
        </div>

        <div className="supform-group">
          <label htmlFor="email" className="supform-label">Email</label>
          <input
            type="email"
            className="supform-input-email"
            name="email"
            value={sup.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {errors.email && <span className="supform-error">{errors.email}</span>}
        </div>

        <div className="supform-group">
          <label htmlFor="address" className="supform-label">Address</label>
          <input
            type="text"
            className="supform-input-address"
            name="address"
            value={sup.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          {errors.address && <span className="supform-error">{errors.address}</span>}
        </div>

        <button type="submit" className="supform-submit-btn">
          Add Supplier
        </button>
      </form>
    </div>
  );
};

export default SupForm;
