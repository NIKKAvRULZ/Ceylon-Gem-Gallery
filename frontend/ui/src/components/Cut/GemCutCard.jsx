import React from 'react'
import './GemCutCard.css'
import axios from 'axios'
import { Link } from 'react-router-dom';


const GemCutCard = ({gemCut}) => {
  return (
    <div class="content-container">
      <div class="card">
        <img src={gemCut.imageUrl} alt={gemCut.name} />
        <h3 class="card-title">{gemCut.name}</h3>

        <p class="card-description">{gemCut.description}</p>

        <button class="Update"><Link class="link" to={`/showdetails/${gemCut._id}`}>Details</Link></button>
      </div>
    </div>
    
  )
}

export default GemCutCard
