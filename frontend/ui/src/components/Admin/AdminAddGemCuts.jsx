import React from 'react';
import './AdminAddGemCuts.css'; // Import the CSS file

const AdminAddGemCuts = () => {
  return (
    <div className="Admin-container">
    <div className="Admin-card">
      <h2 className="Admin-card-title">Add Gem Cuts</h2><br/>
      <form className="form" action='#' method="POST">
        <div className="form-group">
          <label htmlFor="cutName" className="label">Cut Name:</label>
          <input type="text" id="cutName" name="cutName" required className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="cutDescription" className="label">Cut Description:</label>
          <textarea id="cutDescription" name="cutDescription" required className="textarea"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="cutImage" className="label">Cut Image URL:</label>
          <input type="text" id="cutImage" name="cutImage" required className="input" />
        </div>
        <div className="form-group">
          <label htmlFor="cutSpecifications" className="label">Cut Specifications:</label>
          <textarea id="cutSpecifications" name="cutSpecifications" required className="textarea"></textarea>
        </div>
        <div>
          <button type="submit" className="submit-button">Add Cut</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default AdminAddGemCuts;
