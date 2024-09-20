import React, { useState, useEffect } from 'react';
import './profile.css';
import { Link } from 'react-router-dom';

function Profile() {
  const [customer, setCustomer] = useState([]);

  // Fetch customer data from API when the component mounts
  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customer');  // Replace with your actual API endpoint
      const data = await response.json();
      setCustomer(data);  // Assuming the API returns an object with the Fname field
      console.log
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  return (
    <div className='mcontainer'>
      <div className='container'>
        <div className='imgcon'>
          <img src="../src/assets/profile.png" alt="no image" className='img' />
        </div>
        <div>
          <h1>{customer.Fname || 'Loading...'}</h1> {/* Display Fname or a fallback */}
        </div>

        <div className='containerButton'>
          <Link to={`/user/showcustomerdetails/${customer._id}`}>
            <button className='btn'>Personal Information</button>
          </Link>
          <br />
          <Link to="/my-orders">
            <button className='btn'>My Orders</button>
          </Link>
          <br />
          <Link to="/my-reviews">
            <button className='btn'>My Reviews</button>
          </Link>
          <br />
          <Link to="/add-items">
            <button className='btn'>Add Items</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
