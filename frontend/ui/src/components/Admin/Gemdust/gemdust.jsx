import React from 'react';
import { Link } from 'react-router-dom';
import './gemdust.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Gemdust(props) {
  const { _id, gemtypes, weight, quality, price, purity, date } = props.gemdust;

  const navigate = useNavigate();

  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this gem dust entry?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/gemdust/${_id}`);
        alert("Gem dust entry deleted successfully!"); // Alert message after deletion
        window.location.reload(); // Reload the same page after deletion
      } catch (error) {
        console.error("Error deleting gem dust entry:", error);
        alert("There was an error deleting the gem dust entry.");
      }
    }
  };

  return (
    <div className="gemdust-system-item">
      <h2 className="gemdust-system-id">Gem Dust ID: {_id}</h2>
      <h3 className="gemdust-system-types">Gem Types: {gemtypes}</h3>
      <h3 className="gemdust-system-weight">Weight: {weight}g</h3>
      <h3 className="gemdust-system-quality">Quality: {quality}</h3>
      <h3 className="gemdust-system-price">Price: {price}</h3>
      <h3 className="gemdust-system-purity">Purity: {purity}%</h3>
      <h3 className="gemdust-system-date">Date: {new Date(date).toLocaleDateString()}</h3>
      
      <div className="gemdust-system-btn-container">
        <button className="gemdust-system-update-button">
          <Link to={`/Admin/GemDustDetails/${_id}`} className="gemdust-system-link">Update</Link>
        </button>
        <button className="gemdust-system-delete-button" onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}

export default Gemdust;
