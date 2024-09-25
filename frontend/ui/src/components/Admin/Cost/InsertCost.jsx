import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CostForm.css";

const InsertCost = () => {
  const [form, setForm] = useState({
    month: "",
    validationCost: "",
    cuttingCost: "",
    salaryCost: "",
    additionalCost: "",
    profit: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.month) {
      setError("Please select a month.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:3000/api/costmanagement", form)
        .then(() => navigate("/Admin/costs"))
        .catch((err) => {
          console.log("Error adding cost:", err);
          setError("Error adding cost, please try again.");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {error && <p className="error-message">{error}</p>}

      <label>Month:</label>
      <input
        type="month"
        name="month"
        value={form.month}
        onChange={handleChange}
        required
      />

      <label>Validation Cost:</label>
      <input
        type="number"
        name="validationCost"
        placeholder="Enter validation cost"
        value={form.validationCost}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Cutting Cost:</label>
      <input
        type="number"
        name="cuttingCost"
        placeholder="Enter cutting cost"
        value={form.cuttingCost}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Salary Cost:</label>
      <input
        type="number"
        name="salaryCost"
        placeholder="Enter salary cost"
        value={form.salaryCost}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Additional Cost:</label>
      <input
        type="number"
        name="additionalCost"
        placeholder="Enter additional cost"
        value={form.additionalCost}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Profit:</label>
      <input
        type="number"
        name="profit"
        placeholder="Enter profit amount"
        value={form.profit}
        onChange={handleChange}
        min="0"
        required
      />

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default InsertCost;
