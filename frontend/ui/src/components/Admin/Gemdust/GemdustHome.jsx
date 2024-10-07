import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Home.css"; // If you want to keep the styles the same, ensure the CSS file matches the new component name.

const GemdustHome = () => {
  return (
    <div className="gemdust-system-home-container">
      {/* Products Section */}
      <div className="gemdust-system-products-section">
        {/* You can map through products here if needed */}
      </div>

      {/* Add Gem Dust Button */}
      <div className="gemdust-system-add-gem-dust-button-container">
        <Link to="/Admin/AddGemDust" className="gemdust-system-add-gem-dust-btn">
          Add Gem Dust
        </Link>
      </div>

      {/* Gem Dust Detail Button */}
      <div className="gemdust-system-gem-dust-button-container">
        <Link to="/Admin/GemDustDetails" className="gemdust-system-gem-dust-btn">
          Gem Dust Details
        </Link>
      </div>

      {/* New User Home Button */}
      <div className="gemdust-system-user-home-button-container">
        <Link to="/User/UserHome" className="gemdust-system-user-home-btn">
          User Home
        </Link>
      </div>
    </div>
  );
};

export default GemdustHome;
