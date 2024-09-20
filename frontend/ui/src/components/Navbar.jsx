import { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import User from '../assets/user.png'
import logo from '../assets/logo.png'  

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
    <div className="layout-container">

    <div className="navbar-container">
      <div className="navbar-background">

        {/* Logo Section */}
        <div className="logo-section">
          <img className="logo-image" src={logo} alt="Logo" />
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
          <Link 
            className={`nav-item ${activeLink === 'Home' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('Home')} to="Home"
          >
            Home
          </Link>
          <Link 
            className={`nav-item ${activeLink === 'Shop' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('Shop')} to="Shop"
          >
            Shop
          </Link>
          <Link className={`nav-item ${activeLink === 'Custom Cuts' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('Custom Cuts')} to="GemCutHome" >
            Custom Cuts
          </Link>
          <Link 
            className={`nav-item ${activeLink === 'About' ? 'highlight' : ''}`}
            onClick={() => handleNavClick('About')} to="About"
          >
            About
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

export default Navbar;
