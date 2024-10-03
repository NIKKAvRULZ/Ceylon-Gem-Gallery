import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Link } from 'react-router-dom';

const RawGemCard = ({ gemCut }) => {
  return (
    <div className="content-container">
      <div className="Cut-card">
        <img 
          src={`http://localhost:3000/Cuts/${gemCut.imageUrl}`} 
          alt={gemCut.name} 
          onError={(e) => { e.target.src = '/path/to/default-image.jpg'; }} // Fallback image
        />
        <h3 className="card-title">{gemCut.name}</h3>
        <p className="card-description">{gemCut.description}</p>
        <p className="card-description">${gemCut.price}</p>
        <Link to={`/user/Gdetails/${gemCut._id}`}>
          <button className="Cut-Update">Details</button>
        </Link>
      </div>
    </div>
  );
};

// Define prop types for better validation
RawGemCard.propTypes = {
  gemCut: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default RawGemCard;