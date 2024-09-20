import React from 'react'
import './GemCutCard.css'
import axios from 'axios'
import { Link } from 'react-router-dom';


const GemCutCard = ({gemCut}) => {
  return (
    <div className="content-container">
      <div className="card">
        <img src={gemCut.imageUrl} alt={gemCut.name} />
        <h3 className="card-title">{gemCut.name}</h3>

        <p className="card-description">{gemCut.description}</p>

        <button className="Update"><Link class="link" to={`/user/showdetails/${gemCut._id}`}>Details</Link></button>
      </div>
    </div>
    
  )
}

export default GemCutCard
