import React, { useState } from 'react';
import axios from 'axios';
import './CompleteJob.css';

const CompleteJob = () => {
  const [trackingID, setTrackingID] = useState('');
  const [workerID, setWorkerID] = useState('');

  const handleCompleteJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/assign/complete/${trackingID}`, { workerID });
      alert('Job completed successfully!');
      setTrackingID('');
      setWorkerID('');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred while completing the job.');
    }
  };

  return (
    <div className="page"> {/* Added wrapper for centering */}
      <div className="complete-job">
        <h2>Complete Job</h2>
        <form onSubmit={handleCompleteJob}>
          <input
            type="text"
            placeholder="Tracking ID"
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
    </div>
  );
};

export default CompleteJob;
