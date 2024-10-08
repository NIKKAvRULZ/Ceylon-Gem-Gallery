import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GemList2.css';

const GemList = () => {
  const [gems, setGems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State to store search input

  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
      .then((response) => setGems(response.data.users))
      .catch((error) => console.error(error));
  }, []);

  const deleteGem = (id) => {
    axios.delete(`http://localhost:3000/api/users/${id}`)
      .then(() => {
        setGems(gems.filter((gem) => gem._id !== id));
        alert("Gem deleted successfully!");
      })
      .catch((error) => console.error(error));
  };

  // Filter gems based on search term (matches with validationid or name)
  const filteredGems = gems.filter(gem =>
    gem.validationid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="validation-gem-list-container">
      <h2 className="validation-gem-list-title">Gem List</h2>

      {/* Search Bar */}
      <div className="validation-gem-list-search">
        <input
          type="text"
          placeholder="Search by Validation ID or Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="validation-gem-list-search-input"
        />
      </div>

      <table className="validation-gem-list-table">
        <thead className="validation-gem-list-header">
          <tr>
            <th className="validation-gem-list-header-cell">Validation ID</th>
            <th className="validation-gem-list-header-cell">Name</th>
            <th className="validation-gem-list-header-cell">Type</th>
            <th className="validation-gem-list-header-cell">Colour</th>
            <th className="validation-gem-list-header-cell">Clarity</th>
            <th className="validation-gem-list-header-cell">Weight (in carats)</th>
            <th className="validation-gem-list-header-cell">Price (in USD)</th>
            <th className="validation-gem-list-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="validation-gem-list-body">
          {filteredGems.map((gem) => (
            <tr key={gem._id} className="validation-gem-list-row">
              <td className="validation-gem-list-cell">{gem.validationid}</td>
              <td className="validation-gem-list-cell">{gem.name}</td>
              <td className="validation-gem-list-cell">{gem.gemType}</td>
              <td className="validation-gem-list-cell">{gem.colour}</td>
              <td className="validation-gem-list-cell">{gem.clarity}</td>
              <td className="validation-gem-list-cell">{gem.weight}</td>
              <td className="validation-gem-list-cell">${gem.price}</td>
              <td className="validation-gem-list-cell">
                <Link to={`/Admin/validation-update/${gem._id}`} className="validation-gem-list-link">Update</Link>
                <button onClick={() => deleteGem(gem._id)} className="validation-gem-list-button">Delete</button>
                <Link to={`/Admin/validation-postcutf/${gem._id}`} className="validation-gem-list-link">Add Postcut details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="validation-gem-list-actions">
        <Link to="/Admin/validation-add" className="validation-gem-list-add-link">Add New Gem</Link>
        <Link to={`/Admin/validation-details/`} className="validation-gem-list-show-link">Show Postcut details</Link>
      </div>
    </div>
  );
};

export default GemList;
