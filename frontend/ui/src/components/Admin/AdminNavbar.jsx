import React, { useState } from 'react';
import './AdminNavbar.css';
import { Link } from 'react-router-dom';
import User from '../../assets/user.png'
import logo from '../../assets/logo.png'

const AdminNavbar = () => {
  // State to track which nav item is active
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home'); // Default active link

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle link click and set the active link
  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="layout-container">

      <div className="navbar-container">
        <div className="navbar-background">

          {/* Logo Section */}
          <div className="logo-section">
          <Link
              className={`nav-item ${activeLink === 'Home' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('Home')} to="AdminHome"
            >
              <img className="logo-image" src={logo} alt="Logo" />  
            </Link>
            
            <div className="logo-text">
              <span className="logo-black">Ceylon<br /> </span>
              <span className="logo-green">Gem</span>
              <span className="logo-black"> Gallery</span>
            </div>
          </div>

          {/* Hamburger Menu Icon */}
          <div className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </div>

          {/* Navigation Links */}
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            
            <Link
              className={`nav-item ${activeLink === 'Shop' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('Shop')} to="AdminShopHome"
            >
              Shop
            </Link>
            <Link className={`nav-item ${activeLink === 'Gem Cut Manage' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('Custom Cuts')} to="AdminGemCutHome" >
              Custom Cuts
            </Link>
            <Link className={`nav-item ${activeLink === 'Payment Manage' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('Payment')} to="AdminPaymentManagement" >
              Transactions
            </Link>
            <Link className={`nav-item ${activeLink === 'customer Manage' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('customer')} to="customerList" >
              Customer
            </Link>
            <Link
              className={`nav-item ${activeLink === 'complete-job' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('complete-job')} to="complete-job"
            >
              Complete Job
            </Link>
            <Link
              className={`nav-item ${activeLink === 'staff' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('staff')} to="staff"
            >
              Staff Management
            </Link>
            <Link className={`nav-item ${activeLink === 'Gem dust Manage' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('Gem Dust')} to="AdminGemDustHome" 
              >
              Manage GemDust
            </Link>
            <Link className={`nav-item ${activeLink === 'Validation' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('Validation')} to="validation" 
              >
              Gem Validation
            </Link>
            <Link
              className={`nav-item ${activeLink === 'Home' ? 'highlight' : ''}`}
              onClick={() => handleNavClick('Supplier')} to="supplier-home"
            >
              Supplier
            </Link>

          </div>

          {/* User Icon */}
          <div className="icon-placeholder">
            <img className="profile-icon" src={User} alt="User" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
