import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Correct imports
import './UpdateGemdust.css';



function UpdateGemdust() {
  const [formData, setFormData] = useState({
    gemtypes: '',
    weight: '',
    quality: '',
    price: '',
    purity: '',
    date: '',
    image: null, // Add image field
  });

  const navigate = useNavigate(); // Correct variable name for navigate hook
  const { id } = useParams(); // Destructure useParams to get id

  // Fetch existing gemdust data
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:3000/gemdust/${id}`)
        .then((res) => res.data)
        .then((data) =>
          setFormData({
            ...data.gemdust,
            date: new Date(data.gemdust.date).toISOString().split('T')[0], // format date to YYYY-MM-DD
            image: data.gemdust.imageUrl || null, // Fetch existing image URL (if any)
          })
        );
    };
    fetchHandler();
  }, [id]);

  // Send request to update gemdust details along with the image
  const sendRequest = async () => {
    const updatedData = new FormData(); // Using FormData for image and other fields

    // Append fields to FormData
    updatedData.append("gemtypes", formData.gemtypes);
    updatedData.append("weight", formData.weight);
    updatedData.append("quality", formData.quality);
    updatedData.append("price", formData.price);
    updatedData.append("purity", formData.purity);
    updatedData.append("date", formData.date);

    if (formData.image) {
      updatedData.append("image", formData.image); // Append image file if selected
    }

    await axios
      .put(`http://localhost:3000/gemdust/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set correct content type for file upload
        },
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Set image file when selected
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    // Navigate to the GemDustDetails page after submission
    navigate('/admin/gemdustdetails');
  };

  return (
    <div>
      <div className="add-gem-dust-container">
        <h2 className="form-title">Update Gem Dust</h2>
        <form onSubmit={handleSubmit} className="gem-dust-form">
          {/* Gem Types */}
          <div className="form-group">
            <label htmlFor="gemtypes">Gem Types</label>
            <input
              type="text"
              name="gemtypes"
              id="gemtypes"
              value={formData.gemtypes}
              onChange={handleChange}
              placeholder="Enter gem types"
              required
            />
          </div>

          {/* Weight */}
          <div className="form-group">
            <label htmlFor="weight">Weight (in grams)</label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight"
              required
            />
          </div>

          {/* Quality */}
          <div className="form-group">
            <label htmlFor="quality">Quality</label>
            <input
              type="text"
              name="quality"
              id="quality"
              value={formData.quality}
              onChange={handleChange}
              placeholder="Enter quality"
              required
            />
          </div>

          {/* Color */}
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          {/* Purity */}
          <div className="form-group">
            <label htmlFor="purity">Purity</label>
            <input
              type="text"
              name="purity"
              id="purity"
              value={formData.purity}
              onChange={handleChange}
              placeholder="Enter purity level"
              required
            />
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image */}
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleFileChange} // Handle file selection
            />
            {formData.image && typeof formData.image === 'string' && (
              <img
                src={`http://localhost:3000/${formData.image}`}
                alt="Current gemdust"
                style={{ width: "100px", height: "100px", marginTop: "10px" }}
              />
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateGemdust;
