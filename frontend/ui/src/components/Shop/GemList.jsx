import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './delete.css';

const GemList = () => {
  const [gems, setGems] = useState([]);

  // Fetch gems from the backend
  const fetchGems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/gemShop');
      setGems(response.data);
    } catch (error) {
      console.error('Error fetching gems:', error);
    }
  };

  // Delete gem by ID
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/gemShop/${id}`);
      alert(response.data.msg); // Display success message
      fetchGems(); // Refresh the gem list after deletion
    } catch (error) {
      console.error('Error deleting gem:', error);
      alert('Error deleting gem. Please try again.');
    }
  };

  // Fetch gems on component mount
  useEffect(() => {
    fetchGems();
  }, []);

  return (
    <div className="gem-list-container">
      <h2>Gem List</h2>
      <table className="gem-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gems.map((gem) => (
            <tr key={gem._id}>
              <td>{gem.name}</td>
              <td>{gem.description}</td>
              <td>{gem.price}</td>
              <td>
                <button className="gem-delete-button" onClick={() => handleDelete(gem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GemList;