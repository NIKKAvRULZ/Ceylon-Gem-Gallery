import React from 'react';
import './AdminGemCutCard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminGemCutCard = ({ AdminGemCut }) => {

  const onDeleteClick = (id) => {
    axios.delete(`http://localhost:3000/api/cuts/${id}`)
      .then(() => {
        window.location.reload(); // Reload the page after deletion
      })
      .catch((err) => {
        console.log("Delete failed", err); // You could add alert here for user feedback
      });
  };

  return (
    <div className="content-container">
      <div className="card">
        <img src={`http://localhost:3000/Cuts/${AdminGemCut.imageUrl}`} alt={AdminGemCut.name} />
        <h3 className="card-title">{AdminGemCut.name}</h3>
        <p className="card-description">{AdminGemCut.description}</p>

        <button className="Update">
          <Link className="link" to={`/admin/updateDetails/${AdminGemCut._id}`}>Update</Link>
        </button>
        <button className="Delete" onClick={() => onDeleteClick(AdminGemCut._id)}>Delete</button>
      </div>
    </div>
  );
};

export default AdminGemCutCard;
