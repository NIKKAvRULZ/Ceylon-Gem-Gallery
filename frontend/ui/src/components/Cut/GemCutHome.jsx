import React from 'react'
import './GemCutHome.css'
import { Link } from 'react-router-dom';
const GemCutHome = () => {
  return (
    <div>
    <section class="hero">
        <div class="hero-text">
            <ul>
                <li><Link to="CustomCut">Predefined Cuts</Link></li>
                <li><a href="#">Track My Gem</a></li>
            </ul>
        </div>
    </section>
    </div>
  )
}

export default GemCutHome
