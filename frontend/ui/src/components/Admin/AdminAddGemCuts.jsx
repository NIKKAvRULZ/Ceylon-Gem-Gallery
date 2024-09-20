import React, { useState } from 'react';
import './AdminAddGemCuts.css'; // Import the CSS file
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminAddGemCuts = () => {
  // State to store form data
  const [gemCutData, setGemCutData] = useState({
    name: '',
    description: '',
    image: '', 
    Shape: '',
    Facets: '',
    Proportions: '',
    appearance: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGemCutData({
      ...gemCutData,
      [name]: value,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setGemCutData({
      ...gemCutData,
      image: e.target.files[0], // Store the selected file in state
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const formData = new FormData();
    formData.append('name', gemCutData.name);
    formData.append('description', gemCutData.description);
    formData.append('image', gemCutData.image); // Append the image file
    formData.append('shape', gemCutData.shape);
    formData.append('facets', gemCutData.facets);
    formData.append('proportions', gemCutData.proportions);
    formData.append('appearance', gemCutData.appearance);

    try {
      // Send the form data to the backend
      const response = await axios.post('http://localhost:3000/api/cuts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
      });
      console.log('Gem cut added successfully:', response.data);

      // Optionally, reset the form after successful submission
      setGemCutData({
        name: '',
        description: '',
        image: '',
        shape: '',
        facets: '',
        proportions: '',
        appearance: '',
      });
    } catch (error) {
      console.error('Error adding gem cut:', error);
    }
  };

  return (
    <div className="Admin-container">
      <div className="Admin-card">
        <h2 className="Admin-card-title">Add Gem Cuts</h2><br />
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cutName" className="label">Cut Name:</label>
            <input
              type="text"
              id="cutName"
              name="name"
              value={gemCutData.name}
              required
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutDescription" className="label">Cut Description:</label>
            <textarea
              id="cutDescription"
              name="description"
              value={gemCutData.description}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutImage" className="label">Cut Image URL:</label>
            <input
              type="text"
              id="cutImage"
              name="imageUrl"
              value={gemCutData.imageUrl}
              required
              className="input"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cutShape" className="label">Cut Shape:</label>
            <textarea
              id="cutShape"
              name="shape"
              value={gemCutData.shape}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutFacets" className="label">Cut Facets:</label>
            <textarea
              id="cutFacets"
              name="facets"
              value={gemCutData.facets}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutProportions" className="label">Cut Proportions:</label>
            <textarea
              id="cutProportions"
              name="proportions"
              value={gemCutData.proportions}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="cutAppearance" className="label">Cut Appearance:</label>
            <textarea
              id="cutAppearance"
              name="appearance"
              value={gemCutData.appearance}
              required
              className="textarea"
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-outline-choose float-right">Add Cut</button>
            <Link to={"/AdminGemCutHome/AdminGemCutList"} className="btn btn-outline-danger float-right">Back</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddGemCuts;