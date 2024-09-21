import React, { useState } from 'react';
import axios from 'axios';

const CreateJob = () => {
  const [cutId, setCutId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [workerId, setWorkerId] = useState('');

  const createJob = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/jobs', {
        cutId,
        customerId
      });

      setTrackingId(response.data.trackingId);
      setWorkerId(response.data.workerId);
    } catch (error) {
      console.error('Failed to create job:', error);
    }
  };

  return (
    <div className="create-job-container">
      <h2>Create Gem Cutting Job</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        createJob();
      }}>
        <label htmlFor="cutId">Select Cut:</label>
        <input
          type="text"
          id="cutId"
          value={cutId}
          onChange={(e) => setCutId(e.target.value)}
        />

        <label htmlFor="customerId">Customer ID:</label>
        <input
          type="text"
          id="customerId"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <button type="submit">Assign Worker & Create Job</button>
      </form>

      {trackingId && (
        <div>
          <p>Tracking ID: {trackingId}</p>
          <p>Assigned Worker ID: {workerId}</p>
        </div>
      )}
    </div>
  );
};

export default CreateJob;
