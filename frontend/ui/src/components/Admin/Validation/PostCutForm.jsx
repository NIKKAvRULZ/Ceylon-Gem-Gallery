import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './PostCutForm.css'; // Ensure CSS file exists

const PostCutForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    validationid: "",
    gemType: "",
    cutType: "",
    weight: "",
    polish: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form field changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validation logic for each field
    switch (name) {
      case "validationid":
        // Only allow numbers (integers)
        if (/^\d*$/.test(value)) {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
        break;
      case "gemType":
      case "cutType":
      case "polish":
        // Only allow letters (alphabetic characters)
        if (/^[a-zA-Z]*$/.test(value)) {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
        break;
      case "weight":
      case "price":
        // Only allow numbers (with optional decimal for weight/price)
        if (/^\d*\.?\d*$/.test(value)) {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
        break;
      case "description":
        // Allow any characters for description
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        break;
      default:
        break;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const clearForm = () => {
    setFormData({
      validationid: "",
      gemType: "",
      cutType: "",
      weight: "",
      polish: "",
      price: "",
      description: "",
    });
    setImage(null);
    document.getElementById("postCutForm").reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postCutData = new FormData();
    postCutData.append("validationid", formData.validationid);
    postCutData.append("gemType", formData.gemType);
    postCutData.append("cutType", formData.cutType);
    postCutData.append("weight", formData.weight);
    postCutData.append("polish", formData.polish);
    postCutData.append("price", formData.price);
    postCutData.append("description", formData.description);

    if (image) {
      postCutData.append("image", image);
    }

    try {
      await axios.post("http://localhost:3000/api/postcut", postCutData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearForm();
      navigate("/Admin/validation-details");
    } catch (err) {
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-cut-form-container">
      <h2 className="form-title">Add Post-Cut Gem</h2>
      <form id="postCutForm" onSubmit={handleSubmit} className="post-cut-form">
        <div className="post-form-group">
          <label className="post-form-label" htmlFor="validationid">Validation ID</label>
          <input
            className="post-form-input"
            type="text"
            name="validationid"
            value={formData.validationid}
            onChange={handleChange}
            required
          />
        </div>

        <div className="post-form-group">
          <label className="post-form-label" htmlFor="gemType">Gem Type</label>
          <input
            className="post-form-input"
            type="text"
            name="gemType"
            value={formData.gemType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="post-form-group">
          <label className="post-form-label" htmlFor="cutType">Cut Type</label>
          <input
            className="post-form-input"
            type="text"
            name="cutType"
            value={formData.cutType}
            onChange={handleChange}
            required
          />
        </div>

        <div className="post-form-group">
          <label className="post-form-label" htmlFor="weight">Weight (ct)</label>
          <input
            className="post-form-input"
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="post-form-group">
          <label className="post-form-label" htmlFor="polish">Polish</label>
          <input
            className="post-form-input"
            type="text"
            name="polish"
            value={formData.polish}
            onChange={handleChange}
            required
          />
        </div>

        <div className="post-form-group">
          <label className="post-form-label" htmlFor="price">Price ($)</label>
          <input
            className="post-form-input"
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="post-form-group">
          <label className="post-form-label" htmlFor="description">Description</label>
          <textarea
            className="post-description-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="post-form-group">
          <label className="post-form-label" htmlFor="image">Image</label>
          <input
            className="post-form-input"
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="post-form-submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostCutForm;
