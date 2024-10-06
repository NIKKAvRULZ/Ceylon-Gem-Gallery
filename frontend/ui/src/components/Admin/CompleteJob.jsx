import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CompleteJob.css';

const CompleteJob = () => {
  const [trackingID, setTrackingID] = useState('');
  const [trackingOptions, setTrackingOptions] = useState([]); // Store available tracking IDs
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch incomplete jobs
  useEffect(() => {
    const fetchTrackingOptions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/track/incomplete'); // Corrected endpoint
        setTrackingOptions(response.data);
      } catch (err) {
        setError('Failed to fetch tracking options.');
        console.error(err);
      }
    };

    fetchTrackingOptions();
  }, []);

  // Handle complete job
  const handleCompleteJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call API to complete the job
      const response = await axios.post(`http://localhost:3000/api/assign/complete/${trackingID}`);
      
      // Success feedback and reset form
      alert('Job completed successfully!');
      setTrackingID('');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while completing the job.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="assign-job">
        <h2>Complete Job</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleCompleteJob}>
          {/* Dropdown for selecting tracking ID */}
          <select
            value={trackingID}
            onChange={(e) => setTrackingID(e.target.value)}
            required
          >
            <option value="">Select Tracking ID</option>
            {trackingOptions.map((track) => (
              <option key={track._id} value={track.trackingID}>
                {track.trackingID} {/* Adjust this based on your data structure */}
              </option>
            ))}
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Completing...' : 'Complete Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteJob;
