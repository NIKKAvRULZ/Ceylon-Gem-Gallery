import React, { useState } from 'react';
import axios from 'axios';
import './TrackGemCut.css'; // Assuming CSS styles for the component

const TrackOrder = () => {
  const [trackingID, setTrackingID] = useState('');
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/api/track/${trackingID}`);
      console.log("Response Data:", response.data);
      setJobDetails(response.data.job);
      setError('');
    } catch (error) {
      console.error("Error Fetching Job Details:", error);
      setJobDetails(null);
      setError(error.response?.data?.message || 'Error fetching job details.');
    }
  };

  return (
    <div className='page-tr'>
    
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

      {error && <p id="error-message">{error}</p>}

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
    </div>
  );
};

export default TrackOrder;
