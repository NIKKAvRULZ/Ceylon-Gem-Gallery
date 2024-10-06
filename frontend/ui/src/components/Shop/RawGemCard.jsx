import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import '../Cut/GemCutCard.css';
import { Link } from 'react-router-dom';

const RawGemCard = ({ gem }) => {
  const handleImageError = (e) => {
    console.error(`Image failed to load for ${gem.name}. Using fallback image.`);
  };

  return (
    <div className="content-container">
      <div className="Cut-card">
        <img
          src={gem.imageUrl ? `http://localhost:3000/Cuts/${gem.imageUrl}` : '/path/to/default-image.jpg'}
          alt={gem.name}
          onError={handleImageError} // Handle image load error
        />
        <h3 className="card-title">{gem.name}</h3>
        <p className="card-description">{gem.description}</p>
        <p className="card-price">${gem.price}</p> {/* Class renamed for clarity */}
        <Link to={`/user/Gdetails/${gem._id}`}>
          <button className="Cut-Update">Details</button>
        </Link>
      </div>
    </div>
  );
};

// Define prop types for better validation
RawGemCard.propTypes = {
  gem: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, // Ensure price is a number
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default RawGemCard;
