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
      .then((res) =>
        setForm({ ...res.data, month: res.data.month.substring(0, 7) })
      ) // Extracting YYYY-MM from the date
      .catch((err) => console.log("Error fetching cost data:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedForm = { ...form, month: new Date(form.month) };
    axios
      .put(`http://localhost:3000/api/costmanagement/${id}`, formattedForm)
      .then(() => navigate("/Admin/costs"))
      .catch((err) => console.log("Error updating cost:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
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
        Update
      </button>
    </form>
  );
};

export default UpdateCost;
