import React from 'react'
import '../components/Cut/GemCutHome.css';
import { Link } from 'react-router-dom';
import './LoginHome.css'

const LoginHome = () => {
  return (
    <div className="login-container">
      <section className="hero">
        <div className="hero-text">

          <div className="home-card-container">

            <Link to="UserLogin" className="home-card">
              <div className="card-content">
                <h3>User Login</h3>
              </div>
            </Link>

            <Link to="AdminLogin" className="home-card">
              <div className="card-content">
                <h3>Admin Login</h3>
              </div>
            </Link>
            
            <Link to="WorkerLogin" className="home-card">
              <div className="card-content">
                <h3>Worker Login</h3>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </div>
  )
}

export default LoginHome
