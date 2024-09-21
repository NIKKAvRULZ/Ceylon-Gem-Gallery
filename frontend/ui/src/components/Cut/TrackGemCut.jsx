import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Track Your Order</h2>
      <form onSubmit={handleTrackOrder}>
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingID}
          onChange={(e) => setTrackingID(e.target.value)}
          required
        />
        <button type="submit">Track Order</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {jobDetails && (
        <div>
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
