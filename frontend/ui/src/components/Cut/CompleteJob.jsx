import React, { useState } from 'react';
import axios from 'axios';
import './CompleteJob.css';

const CompleteJob = () => {
  const [trackingID, setTrackingID] = useState(''); // Update state to hold tracking ID
  const [workerID, setWorkerID] = useState('');

  const handleCompleteJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/assign/complete/${trackingID}`, { workerID });
      alert('Job completed successfully!');
      setTrackingID(''); // Clear the tracking ID input
      setWorkerID(''); // Clear the worker ID input
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred while completing the job.');
    }
  };
  

  return (
    <div className="complete-job">
      <h2>Complete Job</h2>
      <form onSubmit={handleCompleteJob}>
        <input
          type="text"
          placeholder="Tracking ID" // Change placeholder to reflect the tracking ID
          value={trackingID}
          onChange={(e) => setTrackingID(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Worker ID"
          value={workerID}
          onChange={(e) => setWorkerID(e.target.value)}
          required
        />
        <button type="submit">Complete Job</button>
      </form>
    </div>
  );
};

export default CompleteJob;
