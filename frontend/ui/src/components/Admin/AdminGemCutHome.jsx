import React from 'react'
import './AdminGemCutHome.css'
import { Link } from 'react-router-dom';
const AdminGemCutHome = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-text">

          <div className="home-card-container">

            <Link to="AdminGemCutList" className="home-card">
              <div className="card-content">
                <h3>Manage Cuts</h3>
              </div>
            </Link>

            <Link to="AdminAddGemCuts" className="home-card">
              <div className="card-content">
                <h3>Add Cuts</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminGemCutHome
