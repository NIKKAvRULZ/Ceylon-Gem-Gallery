import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignJob.css';

const AssignJob = () => {
  const [workers, setWorkers] = useState([]);
  const [cutID, setCutID] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [workerID, setWorkerID] = useState('');

  useEffect(() => {
    // Fetch workers from the API
    const fetchWorkers = async () => {
      const response = await axios.get('http://localhost:3000/api/employees');
      setWorkers(response.data);
    };
    fetchWorkers();
  }, []);

  const handleAssignJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/assign/assign', { workerID, cutID, customerID });
      alert('Job assigned successfully!');
      setWorkerID('');
      setCutID('');
      setCustomerID('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="assign-job">
      <h2>Assign Job to Worker</h2>
      <form onSubmit={handleAssignJob}>
        <select value={workerID} onChange={(e) => setWorkerID(e.target.value)} required>
          <option value="">Select Worker</option>
          {workers && workers.map((worker) => (
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
