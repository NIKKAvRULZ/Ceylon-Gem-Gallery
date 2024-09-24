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
      <select
        name="month"
        value={form.month}
        onChange={handleChange}
        required
      >
        <option value="">Select a month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>

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
