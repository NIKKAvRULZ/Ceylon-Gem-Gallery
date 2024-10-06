import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../Admin/Validation/GemForm.css";

const GemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [gem, setGem] = useState({
    validationid: '',
    name: '',
    gemType: '',
    colour: '',
    clarity: 'FL', // Default value for clarity
    weight: '',
    price: ''
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/users/${id}`)
        .then((response) => setGem(response.data.user))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGem({ ...gem, [name]: value });
  };

  const handleNameKeyPress = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const namePattern = /^[A-Za-z\s]+$/; // Allow only letters and spaces
    if (!namePattern.test(char)) {
      e.preventDefault();
    }
  };

  const handleIdKeyPress = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const idPattern = /^[0-9]+$/; // Allow only numbers
    if (!idPattern.test(char)) {
      e.preventDefault();
    }
  };

  const handleNumberKeyPress = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const numberPattern = /^[0-9.]+$/; // Allow only numbers and decimal point
    if (!numberPattern.test(char)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = id 
      ? axios.put(`http://localhost:3000/api/users/${id}`, gem)
      : axios.post('http://localhost:3000/api/users', gem);

    request.then(() => navigate('/Admin/validation'))
      .catch((error) => console.error(error));
  };

  return (
    <div className="validation-gem-form-container">
      <h2 className="validation-form-header">{id ? 'Update Gem' : 'Add New Gem'}</h2>
      <form onSubmit={handleSubmit} className="validation-gem-form">
        
        <label className="validation-form-label">Gem ID</label>
        <input
          className="validation-form-input"
          name="validationid"
          value={gem.validationid}
          onChange={handleChange}
          onKeyPress={handleIdKeyPress} 
          required
        />
        
        <label className="validation-form-label">Gem Name</label>
        <input
          className="validation-form-input"
          name="name"
          value={gem.name}
          onChange={handleChange}
          onKeyPress={handleNameKeyPress} 
          required
        />
        
        <label className="validation-form-label">Gem Type</label>
        <select
          className="validation-form-select"
          name="gemType"
          value={gem.gemType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select Gem Type</option>
          <option value="Raw ">Raw (Uncut/Unprocessed)</option>
          <option value="Cut ">Cut (Cutted/Processed)</option>
          <option value="Polished ">Polished (Finished)</option>
          <option value="Rough">Rough</option>
          <option value="Synthetic">Synthetic/Man-made</option>
        </select>
        
        <label className="validation-form-label">Colour</label>
        <input
          className="validation-form-input"
          name="colour"
          value={gem.colour}
          onChange={handleChange}
          onKeyPress={handleNameKeyPress}
          required
        />
        
        <label className="validation-form-label">Clarity</label>
        <select
          className="validation-form-select"
          name="clarity"
          value={gem.clarity}
          onChange={handleChange}
          required
        >
          <option value="FL">FL (Flawless)</option>
          <option value="IF">IF (Internally Flawless)</option>
          <option value="VVS1">VVS1 (Very, Very Slightly Included)</option>
          <option value="VVS2">VVS2 (Very, Very Slightly Included)</option>
          <option value="VS1">VS1 (Very Slightly Included)</option>
          <option value="VS2">VS2 (Very Slightly Included)</option>
          <option value="SI1">SI1 (Slightly Included)</option>
          <option value="SI2">SI2 (Slightly Included)</option>
        </select>

        <label className="validation-form-label">Weight</label>
        <input
          className="validation-form-input"
          type="number"
          name="weight"
          value={gem.weight}
          onChange={handleChange}
          onKeyPress={handleNumberKeyPress}
          min="0"
          required
        />
        
        <label className="validation-form-label">Estimated Price</label>
       <input
         className="validation-form-input"
         type="number"
         name="price"
         value={gem.price}
         onChange={handleChange}
         onKeyPress={handleNumberKeyPress}
         min="0" 
         required
       />
        
        <button className="validation-form-button" type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default GemForm;
