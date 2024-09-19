import React from 'react'
import './AdminGemCutHome.css'
import { Link } from 'react-router-dom';
const AdminGemCutHome = () => {
  return (
    <div>
    <section class="hero">
        <div class="hero-text">
            <ul>
                <li><Link to="AdminGemCutList">Manage Cuts</Link></li>
                <li><Link to="AdminAddGemCuts">Add Cuts</Link></li>
            </ul>
        </div>
    </section>
    </div>
  )
}

export default AdminGemCutHome
