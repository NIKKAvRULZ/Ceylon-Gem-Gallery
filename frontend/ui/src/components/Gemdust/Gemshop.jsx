import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './GemShop.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';

const GemDetails = () => {
  const { id } = useParams(); // Get the gem ID from the URL
  const [gemData, setGemData] = useState(null);
  const [error, setError] = useState("");

  // Fetch gem details when the component mounts
  useEffect(() => {
    const fetchGemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/gemdust/${id}`);
        setGemData(response.data.gemdust); // Set gem data
      } catch (error) {
        console.error("Error fetching gem details:", error);
        setError("Error fetching gem details. Please try again later.");
      }
    };
    fetchGemDetails();
  }, [id]);

  // Handle purchase button click
  const handlePurchase = () => {
    if (gemData) {
      alert(`Purchasing ${gemData.gemtypes} for $${gemData.price}`);
    }
  };

  return (
    <div className="gemdust-system-container">
      <h2 className="gemdust-system-title">{gemData ? gemData.gemtypes : "Gem Dust Details"}</h2>
      {error && <p className="gemdust-system-error">{error}</p>}

      {/* Display gem details if gemData is available */}
      {gemData && (
        <>
          <div className="gemdust-system-image-preview">
            <img
              src={`http://localhost:3000/${gemData.image}`} // Correct image URL using gemData
              alt={`${gemData.gemtypes}`} // Alt text as the gem type
              className="gemdust-system-image"
            />
          </div>
          <div className="gemdust-system-info">
            <div className="gemdust-system-detail-item">
              <span className="gemdust-system-icon">💎</span>
              <span>Type: {gemData.gemtypes}</span>
            </div>
            <div className="gemdust-system-detail-item">
              <span className="gemdust-system-icon">⚖️</span>
              <span>Weight: {gemData.weight} grams</span>
            </div>
            <div className="gemdust-system-detail-item">
              <span className="gemdust-system-icon">⭐</span>
              <span>Quality: {gemData.quality}</span>
            </div>
            <div className="gemdust-system-detail-item">
              <span className="gemdust-system-icon">🔍</span>
              <span>Purity: {gemData.purity}%</span>
            </div>
            <div className="gemdust-system-detail-item">
              <span className="gemdust-system-icon">📅</span>
              <span>Date: {new Date(gemData.date).toLocaleDateString()}</span>
            </div>
            <div className="gemdust-system-detail-item price-detail"> {/* Added class for styling */}
              <span className="gemdust-system-icon">💰</span>
              <span>Price: ${gemData.price}</span>
            </div>
          </div>

          <Link to={"/user/insert-payment"}><button className="gemdust-system-purchase-btn" onClick={handlePurchase}>Payment</button></Link>
        </>
      )}
    </div>
  );
};

export default GemDetails;
