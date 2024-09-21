import React, { useState } from 'react';
import axios from 'axios';
import './TrackGemCut.css';

const TrackOrder = () => {
  const [trackingID, setTrackingID] = useState('');
  const [jobDetails, setJobDetails] = useState(null);
  const [error, setError] = useState('');

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/assign/track/${trackingID}`);
      setJobDetails(response.data.job);
      setError('');
    } catch (error) {
      setJobDetails(null);
      setError(error.response?.data?.message || 'Error fetching job details.');
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
      {error && <p id="error-message">{error}</p>}
      {jobDetails && (
        <div id="job-details">
          <h3>Job Details:</h3>
          <p><strong>Worker:</strong> {jobDetails.workerID.name}</p>
          <p><strong>Cut ID:</strong> {jobDetails.cutID}</p>
          <p><strong>Customer ID:</strong> {jobDetails.customerID}</p>
          <p><strong>Status:</strong> {jobDetails.status}</p>
          <p><strong>Tracking ID:</strong> {jobDetails.trackingID}</p>
          <p><strong>Created At:</strong> {new Date(jobDetails.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
  
  
};

export default TrackOrder;
