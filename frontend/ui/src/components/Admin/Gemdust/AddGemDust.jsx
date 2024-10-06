import React, { useState } from "react";
import "./AddGemDust.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddGemDust = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gemType: "",
    weight: "",
    quality: "",
    price: "",
    purity: "",
    date: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "gemType":
        if (/^[a-zA-Z\s]*$/.test(value)) { // Allow only letters and spaces
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
        break;

      case "weight":
      case "purity":
      case "price":
        if (/^\d*\.?\d*$/.test(value)) { // Allow only numbers and decimal points
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
        break;

      default:
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        break;
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  // Clear form data and image file
  const clearForm = () => {
    setFormData({
      gemType: "",
      weight: "",
      quality: "",
      price: "",
      purity: "",
      date: "",
    });
    setImage(null);
    document.getElementById("gemDustForm").reset();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const gemDustData = new FormData();
    gemDustData.append("gemtypes", formData.gemType);
    gemDustData.append("weight", formData.weight);
    gemDustData.append("quality", formData.quality);
    gemDustData.append("price", formData.price);
    gemDustData.append("purity", formData.purity);
    gemDustData.append("date", formData.date);

    if (image) {
      gemDustData.append("image", image);
    }

    try {
      await axios.post("http://localhost:3000/gemdust", gemDustData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearForm(); // Clear form fields and image input
      navigate("/Admin/GemDustDetails"); // Navigate to GemDustDetails after submission
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gemdust-system-container">
      <h2 className="gemdust-system-form-title">Add Gem Dust</h2>
      <form id="gemDustForm" onSubmit={handleSubmit} className="gemdust-system-form">
        {/** Form Fields */}
        <div className="gemdust-system-form-group">
          <label htmlFor="gemType">Gem Type</label>
          <input
            type="text"
            name="gemType"
            id="gemType"
            value={formData.gemType}
            onChange={handleChange}
            placeholder="Enter gem type"
            inputMode="text"
            pattern="[A-Za-z\s]*"
            required
          />
        </div>

        <div className="gemdust-system-form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            name="weight"
            id="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter weight"
            inputMode="decimal"
            pattern="\d*\.?\d*"
            required
          />
        </div>

        <div className="gemdust-system-form-group">
          <label htmlFor="quality">Quality</label>
          <select
            name="quality"
            id="quality"
            value={formData.quality}
            onChange={handleChange}
            required
          >
            <option value="">Select quality</option> {/* Empty option as a placeholder */}
            <option value="Top quality">Top quality</option>
            <option value="Medium quality">Medium quality</option>
            <option value="Low quality">Low quality</option>
          </select>
        </div>

        <div className="gemdust-system-form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            inputMode="decimal"
            pattern="\d*\.?\d*"
            required
          />
        </div>

        <div className="gemdust-system-form-group">
          <label htmlFor="purity">Purity</label>
          <input
            type="text"
            name="purity"
            id="purity"
            value={formData.purity}
            onChange={handleChange}
            placeholder="Enter purity percentage"
            inputMode="decimal"
            pattern="\d*\.?\d*"
            required
          />
        </div>

        <div className="gemdust-system-form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Enter date"
            required
          />
        </div>

        <div className="gemdust-system-form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="gemdust-system-submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddGemDust;
