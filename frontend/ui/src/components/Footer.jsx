import React from 'react';
import './Footer.css';
import Twitter from '../assets/twitter.png';
import Facebook from '../assets/facebook.png';
import Instagram from '../assets/instagram.png';


const Footer = () => {
  return (
    <div className="footer-container">
      {/* About Us Section */}
      <div className="footer-section">
        <div className="footer-title">About us</div>
        <div className="footer-content">
          Who we are<br />
          Our services<br />
          Contact us
        </div>
        <div className="footer-divider"></div>
      </div>

      {/* Social Media Icons */}
      <div className="social-icons">
        <div className="social-icon">
          <img src={Twitter} alt="Icon 1" />
        </div>
        <div className="social-icon">
          <img src={Facebook} alt="Icon 2" />
        </div>
        <div className="social-icon">
          <img src={Instagram} alt="Icon 3" />
        </div>
      </div>

      {/* Customer Care Section */}
      <div className="footer-section">
        <div className="footer-title">CUSTOMER CARE</div>
        <div className="footer-content">
          Payment & Shipping<br />
          Return Policy<br />
          Privacy Policy
        </div>
        <div className="footer-divider"></div>
      </div>


    </div>
  );
};

export default Footer;
