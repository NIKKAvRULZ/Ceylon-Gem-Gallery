import React from 'react';
import './Card.css';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const profileList = ({ customer, onDelete }) => {

  const navigate = useNavigate();

 

  // Create a hidden password representation with asterisks
  const hiddenPassword = '*'.repeat(customer.Password.length);

  const handleDelete = () => {
    // Trigger SweetAlert when deleting account
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(customer._id); // Call the onDelete function
        navigate('/');
        Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success"
        });
      }
    });
  };

  return (
    <div className='mcontiner'>
      <h1>Profile</h1>
      <div className="email-container">
        <h3 className="email-label">Email</h3>  
        <div className="email-content">
          <span className="email-text">{customer.Email}</span>
          <Link to={`/updatedetails/${customer._id}`} className='change-btn'>Change</Link>
        </div>
      </div>
      <div className="email-container">
        <h3 className="email-label">Password</h3>  
        <div className="email-content">
          <span className="email-text">{hiddenPassword}</span>
          <Link to={`/updatedetails/${customer._id}`} className='change-btn'>Change</Link>
        </div>
      </div>
      <br />
      <h2>Personal Information</h2>
      <div className="email-container">
        <h3 className="email-label">First name</h3>  
        <div className="email-content">
          <span className="email-text">{customer.Fname}</span>
          <Link to={`/updatedetails/${customer._id}`} className='change-btn'>Change</Link>
        </div>
      </div>
      <div className="email-container">
        <h3 className="email-label">Last name</h3>  
        <div className="email-content">
          <span className="email-text">{customer.Lname}</span>
          <Link to={`/updatedetails/${customer._id}`} className='change-btn'>Change</Link>
        </div>
      </div>
      <div className='logout_con'>
        <Link to="/login"><button className='logoutAndDel_btn'>Log Out</button></Link><br />
        <button className='logoutAndDel_btn' onClick={handleDelete}>Delete My Account</button>
      </div>
    </div>
  );
}

export default profileList;
