import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserHome.css';

// Function to fetch user-specific gem dust data
const fetchUserGemDust = async (userId) => {
  try {
    userId = '';
    const response = await axios.get(`http://localhost:3000/gemdust/${userId}`);
    console.log("Fetched Gem Dust: ", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user gem dust:", error);
    return null;
  }
};

function UserHome() {
  const [userGemdust, setUserGemdust] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const userId = "66f3cc688885fe4f7a6dc40c";
  const navigate = useNavigate();

  // Fetch the user's gem dust when the component mounts
  useEffect(() => {
    fetchUserGemDust(userId).then((data) => {
      if (data && data.gemdusts) {
        setUserGemdust(data.gemdusts);
      }
    });
  }, [userId]);

  // Navigate to the GemShop component when an image is clicked
  const handleGemdustClick = (gemdustItem) => {
    navigate(`/User/gemshop/${gemdustItem._id}`, { state: { gemdustItem } });
  };

  // Filter gem dust items based on the search query
  const filteredGemdust = userGemdust.filter((gemdustItem) =>
    gemdustItem.gemtypes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If no gem dust has been added by the user, display a message
  if (!userGemdust || userGemdust.length === 0) {
    return <p>No Gem Dust added yet.</p>;
  }

  return (
    <div className="gemdust-user-home-container">
      {/* Search Bar Container */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Gem Dust Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Display filtered gem dust list */}
      <div className="user-gemdust-list">
        {filteredGemdust.map((gemdustItem, i) => (
          <div 
            key={gemdustItem._id || i} 
            className="user-gemdust-item" 
            onClick={() => handleGemdustClick(gemdustItem)}
          >
            <img 
              src={`http://localhost:3000/${gemdustItem.image}`} 
              alt={`${gemdustItem.gemtypes}`}
              className="gemdust-image"
            />
            <div className="gemdust-details">
              <h2>{gemdustItem.gemtypes}</h2>
              <p>Weight: {gemdustItem.weight}g</p>
              <p>Price: ${gemdustItem.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHome;
