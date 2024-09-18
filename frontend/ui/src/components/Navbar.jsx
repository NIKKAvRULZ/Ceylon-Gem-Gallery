import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
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
    <div className="navbar-container">
      <div className="navbar-background">

        {/* Logo Section */}
        <div className="logo-section">
          <img className="logo-image" src='./src/assets/logo.png' alt="Logo" />
          <div className="logo-text">
            <span className="logo-black">Ceylon<br/> </span>
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
          <div 
            className={`nav-item ${activeLink === 'Home' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('Home')}
          >
            Home
          </div>
          <div 
            className={`nav-item ${activeLink === 'Shop' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('Shop')}
          >
            Shop
          </div>
          <div 
            className={`nav-item ${activeLink === 'Custom Cuts' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('Custom Cuts')}
          >
            Custom Cuts
          </div>
          <div 
            className={`nav-item ${activeLink === 'About' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('About')}
          >
            About
          </div>
        </div>

        {/* User Icon */}
        <div className="icon-placeholder">
          <img className="profile-icon" src='./src/assets/user.png' alt="User" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
