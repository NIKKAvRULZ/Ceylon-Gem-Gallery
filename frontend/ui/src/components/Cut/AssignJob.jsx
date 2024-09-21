import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AssignJob.css';

const AssignJob = () => {
  const [workers, setWorkers] = useState([]);
  const [cuts, setCuts] = useState([]); // For cut IDs
  const [customers, setCustomers] = useState([]); // For customer IDs
  const [cutID, setCutID] = useState('');
  const [customerID, setCustomerID] = useState('');
  const [workerID, setWorkerID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/workers');
        setWorkers(response.data);
      } catch (err) {
        setError('Failed to fetch workers.');
        console.error(err);
      }
    };

    const fetchCuts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cuts'); // Adjust this endpoint as needed
        setCuts(response.data);
      } catch (err) {
        setError('Failed to fetch cuts.');
        console.error(err);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/customer');
        console.log(response.data); // Log the data to check the structure
        setCustomers(response.data);
      }catch (err) {
        setError('Failed to fetch customers: ' + (err.response?.data?.message || err.message));
        console.error(err);
      
      }
    };
    

    fetchWorkers();
    fetchCuts();
    fetchCustomers();
  }, []);

  const handleAssignJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('http://localhost:3000/api/track', {
        workerId: workerID,
        cutId: cutID,
        customerId: customerID,
      });
  
      const { trackOrder } = response.data; // Get the trackOrder from the response
  
      // Displaying job data and tracking ID
      alert(`Job assigned successfully! Tracking ID: ${trackOrder.trackingID}`);
      
      // Optionally, you can log the entire job data
      console.log('Assigned Job Data:', trackOrder);
  
      // Clear the form
      setWorkerID('');
      setCutID('');
      setCustomerID('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while assigning the job.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className='page'>
    <div className="assign-job">
      <h2>Assign Job to Worker</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleAssignJob}>
        <select value={workerID} onChange={(e) => setWorkerID(e.target.value)} required>
          <option value="">Select Worker</option>
          {workers.map((worker) => (
            <option key={worker._id} value={worker._id}>
              {worker.name}
            </option>
          ))}
        </select>

        <select value={cutID} onChange={(e) => setCutID(e.target.value)} required>
          <option value="">Select Cut ID</option>
          {cuts.map((cut) => (
            <option key={cut._id} value={cut._id}>
              {cut.name} {/* Adjust based on your cut object structure */}
            </option>
          ))}
        </select>

        <select value={customerID} onChange={(e) => setCustomerID(e.target.value)} required>
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.Fname} {/* Show only the first name */}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Assigning...' : 'Assign Job'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AssignJob;
