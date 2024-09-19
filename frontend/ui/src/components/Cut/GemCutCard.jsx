import React from 'react'
import './GemCutCard.css'
const GemCutCard = ({gemCut}) => {
  return (
    <div class="content-container">
      <div class="card">
        <img src={gemCut.imageUrl} alt={gemCut.name} />
        <h3 class="card-title">{gemCut.name}</h3>

        <p class="card-description">{gemCut.description}</p>

        <button class="add-to-cart">Use</button>
      </div>
    </div>
    
  )
}

export default GemCutCard
