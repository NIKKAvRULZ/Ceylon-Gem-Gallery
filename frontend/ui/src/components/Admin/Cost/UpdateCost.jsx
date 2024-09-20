import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CostForm.css";

const UpdateCost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    month: "",
    validationCost: 0,
    cuttingCost: 0,
    salaryCost: 0,
    additionalCost: 0,
    profit: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/costmanagement/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log("Error fetching cost data:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const monthPattern =
    /^(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i;

  const validateForm = () => {
    if (!monthPattern.test(form.month)) {
      alert("Please enter a valid month name (e.g., January, Feb, etc.)");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios
        .put(`http://localhost:3000/api/costmanagement/${id}`, form)
        .then(() => navigate("/costs"))
        .catch((err) => console.log("Error updating cost:", err));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Month:</label>
      <input
        type="text"
        name="month"
        placeholder="Enter month (e.g., January)"
        value={form.month}
        onChange={handleChange}
        pattern={monthPattern.source} // Adds month pattern validation in HTML
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
        Update Cost
      </button>
    </form>
  );
};

export default UpdateCost;
