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

  // Prevent non-letter input for name field
  const handleNameKeyPress = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const namePattern = /^[A-Za-z\s]+$/; // Allow only letters and spaces
    if (!namePattern.test(char)) {
      e.preventDefault();
    }
  };

  // Prevent non-numeric input for validationid field
  const handleIdKeyPress = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const idPattern = /^[0-9]+$/; // Allow only numbers
    if (!idPattern.test(char)) {
      e.preventDefault();
    }
  };

  // Allow only numbers in weight and price fields
  const handleNumberKeyPress = (e) => {
    const char = String.fromCharCode(e.keyCode || e.which);
    const numberPattern = /^[0-9.]+$/; // Allow only numbers and decimal point
    if (!numberPattern.test(char)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Submit form if no errors
    const request = id 
      ? axios.put(`http://localhost:3000/api/users/${id}`, gem)
      : axios.post('http://localhost:3000/api/users', gem);

    request.then(() => navigate('/Admin/validation'))
      .catch((error) => console.error(error));
  };

  return (
    <div className="gem-form-container">
      <h2>{id ? 'Update Gem' : 'Add New Gem'}</h2>
      <form onSubmit={handleSubmit} className="gem-form">
        
        <label>Gem ID</label>
        <input
          name="validationid"
          value={gem.validationid}
          onChange={handleChange}
          onKeyPress={handleIdKeyPress} // Prevent non-numeric characters
          required
        />
        
        <label>Gem Name</label>
        <input
          name="name"
          value={gem.name}
          onChange={handleChange}
          onKeyPress={handleNameKeyPress} // Prevent non-letter characters
          required
        />
        
        <label>Gem Type</label>
        <select
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
        
        <label>Colour</label>
        <input
          name="colour"
          value={gem.colour}
          onChange={handleChange}
          onKeyPress={handleNameKeyPress} // Prevent non-letter characters (if colors should be letters only)
          required
        />
        
        <label>Clarity</label>
        <select
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

        <label>Weight</label>
        <input
          type="number"
          name="weight"
          value={gem.weight}
          onChange={handleChange}
          onKeyPress={handleNumberKeyPress} // Allow only numeric and decimal
          min="0"
          required
        />
        
        <label>Estimated Price</label>
       <input
         type="number"
         name="price"
         value={gem.price}
         onChange={handleChange}
         onKeyPress={handleNumberKeyPress} // Allow only numeric and decimal
         min="0" // Prevent negative values via input field
         required
       />

        
        
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default GemForm;
