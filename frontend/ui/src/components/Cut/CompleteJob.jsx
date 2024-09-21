import React, { useState } from 'react';
import axios from 'axios';
import './CompleteJob.css';

const CompleteJob = () => {
  const [jobID, setJobID] = useState('');
  const [workerID, setWorkerID] = useState('');

  const handleCompleteJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/assign/complete/${jobID}`, { workerID });
      alert('Job completed successfully!');
      setJobID('');
      setWorkerID('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="complete-job">
      <h2>Complete Job</h2>
      <form onSubmit={handleCompleteJob}>
        <input
          type="text"
          placeholder="Job ID"
          value={jobID}
          onChange={(e) => setJobID(e.target.value)}
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
