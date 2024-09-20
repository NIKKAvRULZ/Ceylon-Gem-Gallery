import React from 'react'
import { Link } from 'react-router-dom';
import './Shop.css'

const Shop = () => {
  return (
    <div className="Shop-container">
      <Link to="/user/insert-payment " className="home-card">
        <div className="card-content">
          <h3>Payment</h3>
        </div>
      </Link>
    </div>
  )
}

export default Shop
