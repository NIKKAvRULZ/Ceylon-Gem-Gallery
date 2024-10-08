import React, { useEffect } from 'react';
import './Home.css'; // Import the CSS file
import heroImage from '../../assets/logo.png'; // Placeholder for hero section image
import customCuttingImage from '../../assets/custom-cutting.jpeg'; // Placeholder for custom cutting feature
import craftsmanshipImage from '../../assets/craftsmanshipImage.jpg'; // Placeholder for craftsmanship feature
import trackingImage from '../../assets/trackingImage.jpeg'; // Placeholder for tracking feature

const Home = () => {

  useEffect(() => {
    // Tawk.to script
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement('script');
      var s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/66ffb4a0256fb1049b1cd760/1i9bdj5bp';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []); // Ensure the script runs only once when the component mounts

  return (
    <div className="home-container-main">
      {/* Hero Section */}
      <div className="hero-banner">
        <img src={heroImage} alt="Gem Collection" className="hero-image" />
        <div className="head-text">
          <h1>Welcome to Ceylon<font color="green"> Gem </font>Gallery</h1>
          <p>Discover the finest gemstones and experience precision cutting like never before.</p>
          <button className="cta-button">Explore Our Collection</button>
        </div>
      </div>

      {/* Feature Section */}
      <div className="features-section">
        <h2>Our Services</h2>
        <div className="features">
          <div className="feature-item">
            <img src={customCuttingImage} alt="Custom Gem Cutting" className="feature-image" />
            <h3>Custom Gem Cutting</h3>
            <p>Choose from a wide range of predefined cuts or request custom designs to suit your needs.</p>
          </div>
          <div className="feature-item">
            <img src={craftsmanshipImage} alt="Expert Craftsmanship" className="feature-image" />
            <h3>Expert Craftsmanship</h3>
            <p>Our skilled artisans ensure every cut meets the highest standards of quality.</p>
          </div>
          <div className="feature-item">
            <img src={trackingImage} alt="Real-time Process Tracking" className="feature-image" />
            <h3>Real-time Process Tracking</h3>
            <p>Stay updated on your gem's journey from rough stone to polished masterpiece.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
