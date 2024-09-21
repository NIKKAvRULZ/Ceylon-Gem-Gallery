import React, { useState } from 'react';
import axios from 'axios';
import './TrackGemCut.css'; // Assuming CSS styles for the component

const TrackOrder = () => {
  const [trackingID, setTrackingID] = useState(''); // State to hold tracking ID input
  const [jobDetails, setJobDetails] = useState(null); // State to hold job details from the API
  const [error, setError] = useState(''); // State to hold any errors

  // Handle form submission to track the order
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/track/${trackingID}`);
      console.log("Response Data:", response.data); // Log the response data
      setJobDetails(response.data.job); // Set job details if data is found
      setError(''); // Clear any errors
    } catch (error) {
      console.error("Error Fetching Job Details:", error); // Log the error
      setJobDetails(null); // Clear job details in case of an error
      setError(error.response?.data?.message || 'Error fetching job details.'); // Display error message
    }
  };

  return (
    <div id="track-order-container">
      <h2 id="track-order-title">Track Your Order</h2>
      <form id="track-order-form" onSubmit={handleTrackOrder}>
        <input
          id="track-order-input"
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingID}
          onChange={(e) => setTrackingID(e.target.value)}
          required
        />
        <button id="track-order-button" type="submit">Track Order</button>
      </form>

      {/* Display error if there is one */}
      {error && <p id="error-message">{error}</p>}

      {/* Display job details if found */}
      {jobDetails && (
        <div id="job-details">
          <h3>Job Details:</h3>
          <p><strong>Worker:</strong> {jobDetails.workerID.name}</p>
          <p><strong>Cut ID:</strong> {jobDetails.cutID._id}</p>
          <p><strong>Customer:</strong> {jobDetails.customerID.Fname} {jobDetails.customerID.Lname}</p>
          <p><strong>Status:</strong> {jobDetails.status}</p>
          <p><strong>Tracking ID:</strong> {jobDetails.trackingID}</p>
          <p><strong>Created At:</strong> {new Date(jobDetails.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );

  
};


export default TrackOrder;
