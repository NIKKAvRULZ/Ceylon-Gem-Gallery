import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignJob.css';

const AssignJob = () => {
  const [workers, setWorkers] = useState([]);
  const [cutID, setCutID] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [workerID, setWorkerID] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('/api/employees');
        setWorkers(response.data);
      } catch (error) {
        console.error('Error fetching workers:', error);
        alert('Failed to load workers. Please try again later.');
      }
    };
    fetchWorkers();
  }, []);

  const handleAssignJob = async (e) => {
    e.preventDefault();
    try {
      // Use the correct endpoint for assigning a job
      await axios.post('/api/assign', { workerID, cutID, customerID });
      alert('Job assigned successfully!');
      setWorkerID('');
      setCutID('');
      setCustomerID('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while assigning the job.';
      alert(errorMessage);
    }
  };

  return (
    <div className="assign-job">
      <h2>Assign Job to Worker</h2>
      <form onSubmit={handleAssignJob}>
        <select value={workerID} onChange={(e) => setWorkerID(e.target.value)} required>
          <option value="">Select Worker</option>
          {workers.map((worker) => (
            <option key={worker._id} value={worker._id}>
              {worker.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Cut ID"
          value={cutID}
          onChange={(e) => setCutID(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Customer ID"
          value={customerID}
          onChange={(e) => setCustomerID(e.target.value)}
          required
        />
        <button type="submit">Assign Job</button>
      </form>
    </div>
  );
};

export default AssignJob;
