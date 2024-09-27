import React, { useState } from 'react';
import axios from 'axios';
import './AddGem.css';

const AddGem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    Shape: '',
    Facets: '',
    Proportions: '',
    Appearance: '',
    price: '',
    imageUrl: null // For handling file upload
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'imageUrl' ? e.target.files[0] : e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('Shape', formData.Shape);
    data.append('Facets', formData.Facets);
    data.append('Proportions', formData.Proportions);
    data.append('Appearance', formData.Appearance);
    data.append('price', formData.price);
    data.append('imageUrl', formData.imageUrl);

    try {
      // Send the data to the server
      const response = await axios.post('http://localhost:3000/api/gemShop', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.msg); // Display success message

      // Reset the form fields
      setFormData({
        name: '',
        description: '',
        Shape: '',
        Facets: '',
        Proportions: '',
        Appearance: '',
        price: '',
        imageUrl: null // Reset file input
      });

    } catch (error) {
      console.error(error);
      alert('Error adding gem cut. Please try again.');
    }
  };

  return (
    <div className="add-gem-container">
      <h2>Add New Gem Cut</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <div>
          <label>Shape:</label>
          <input type="text" name="Shape" value={formData.Shape} onChange={handleChange} />
        </div>

        <div>
          <label>Facets:</label>
          <input type="text" name="Facets" value={formData.Facets} onChange={handleChange} />
        </div>

        <div>
          <label>Proportions:</label>
          <input type="text" name="Proportions" value={formData.Proportions} onChange={handleChange} />
        </div>

        <div>
          <label>Appearance:</label>
          <input type="text" name="Appearance" value={formData.Appearance} onChange={handleChange} />
        </div>

        <div>
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>

        <div>
          <label>Image:</label>
          <input type="file" name="imageUrl" onChange={handleChange} />
        </div>

        <button type="submit">Add Gem</button>
      </form>
    </div>
  );
};

export default AddGem;
