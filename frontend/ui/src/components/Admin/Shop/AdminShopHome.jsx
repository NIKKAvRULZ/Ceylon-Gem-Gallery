import React from 'react'
import '../AdminGemCutHome.css'
import { Link } from 'react-router-dom';
const AdminShopHome = () => {
  return (
    <div className="home-container-home">
      <section className="hero">
        <div className="hero-text">

          <div className="home-card-container">

            <Link to="AdminGemList" className="home-card">
              <div className="card-content">
                <h3>Manage Gems</h3>
              </div>
            </Link>

            <Link to="AdminAddGem" className="home-card">
              <div className="card-content">
                <h3>Add Gems</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AdminShopHome
