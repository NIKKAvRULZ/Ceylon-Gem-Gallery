import React from 'react'
import '../Home/Home.css'; // Import the CSS file
import heroImage from '../../assets/logo.png'; // Placeholder for hero section image
import manageOrdersImage from '../../assets/manage-orders.jfif'; // Placeholder for managing orders feature
import manageUsersImage from '../../assets/manage-users.png'; // Placeholder for managing users feature
import analyticsImage from '../../assets/analytics.jpg'; // Placeholder for system analytics feature
const AdminHome = () => {
  return (
    <div className="home-container-main">
      {/* Hero Section */}
      <div className="hero-banner">
        <img src={heroImage} alt="Admin Dashboard" className="hero-image" />
        <div className="head-text">
          <h1>Welcome to the Ceylon<font color="green"> Gem </font>Gallery Admin Dashboard</h1>
          <p>Manage gemstone collections, orders, and system operations efficiently from one place.</p>
          <button className="cta-button">Go to Admin Panel</button>
        </div>
      </div>


{/* Feature Section */}
<div className="features-section">
        <h2>Admin Features</h2>
        <div className="features">
          <div className="feature-item">
            <img src={manageOrdersImage} alt="Manage Orders" className="feature-image" />
            <h3>Manage Orders</h3>
            <p>View, track, and process customer orders efficiently through the admin dashboard.</p>
          </div>
          <div className="feature-item">
            <img src={manageUsersImage} alt="Manage Users" className="feature-image" />
            <h3>Manage Users</h3>
            <p>Monitor user activity, update profiles, and manage access rights for different users.</p>
          </div>
          <div className="feature-item">
            <img src={analyticsImage} alt="System Analytics" className="feature-image" />
            <h3>System Analytics</h3>
            <p>Get detailed reports and analytics on the gem cutting process, sales, and system usage.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
