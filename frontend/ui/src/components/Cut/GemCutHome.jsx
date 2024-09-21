import React from 'react';
import './GemCutHome.css';
import { Link } from 'react-router-dom';

const GemCutHome = () => {
  return (
    <div className="home-container-home">
      <section className="hero">
        <div className="hero-text">

          <div className="home-card-container">

            <Link to="CustomCut" className="home-card">
              <div className="card-content">
                <h3>Predefined Cuts</h3>
              </div>
            </Link>

            <Link to="track-order" className="home-card">
              <div className="card-content">
                <h3>Track My Gem</h3>
              </div>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default GemCutHome;
