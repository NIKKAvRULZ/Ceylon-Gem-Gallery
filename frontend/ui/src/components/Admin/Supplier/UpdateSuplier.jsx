import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Suplierform.css"; // Reuse form CSS

const UpdateSup = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phoneNo: "",
    email: "",
    address: "",
  });
  const navigate = useNavigate();

  // Fetch the current staff member's details on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:3000/sup/${id}`)
      .then((res) => setForm(res.data.user))
      .catch((err) => console.log("Error fetching staff:", err));
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit updated form data
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/sup/${id}`, form)
      .then(() => {
        console.log("Staff updated");
        navigate("/Admin/suplier-list");
      })
      .catch((err) => console.log("Error updating staff:", err));
  };

  return (
    <div className="form-container">
      <h2>Update Suplier</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Company:</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="number"
          name="phoneNo"
          value={form.phoneNo}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateSup;
