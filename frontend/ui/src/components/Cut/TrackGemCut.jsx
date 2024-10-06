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
      setJobDetails(response.data);
      setError('');
    } catch (error) {
      console.error("Error Fetching Job Details:", error);
      setJobDetails(null);
      setError(error.response?.data?.message || 'Error fetching job details.');
    }
  };

  const handleDeleteOrder = async () => {
    if (!jobDetails || jobDetails.track.status !== 'Completed') {
      setError('Job can only be deleted if it is completed.');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/api/track/${jobDetails.track._id}`);
      console.log("Delete Response:", response.data); // Log the response data
      setJobDetails(null);
      alert('Job deleted successfully.');
    } catch (error) {
      console.error("Error Deleting Job:", error);
      setError(error.response?.data?.message || 'Error deleting job.');
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

        {jobDetails && (<>
          {jobDetails.track ? (
            <div id="job-details">
              <h3>Job Details:</h3>
              <p><strong>Worker:</strong> {jobDetails.worker.name}</p>
              <p><strong>Cut ID:</strong> {jobDetails.cut._id}</p>
              <p><strong>Customer:</strong> {jobDetails.customer.Fname} {jobDetails.customer.Lname}</p>
              <p><strong>Status:</strong> {jobDetails.track.status}</p>
              <p><strong>Tracking ID:</strong> {jobDetails.track._id}</p>
              <p><strong>Created At:</strong> {new Date(jobDetails.track.createdAt).toLocaleString()}</p>

              {jobDetails.track.status === 'Completed' && (
                <button onClick={handleDeleteOrder} id="delete-order-button">Delete Job</button>
              )}
            </div>
          ) : (
            <>
              <div id="job-details">
                <h3>Job Not Found</h3>
              </div>
            </>
          )}
        </>)}
      </div>
    </div>
  );
};

export default TrackOrder;
