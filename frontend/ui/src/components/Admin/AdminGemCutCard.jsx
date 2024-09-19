import React from 'react'
import './AdminGemCutCard.css'
const AdminGemCutCard = ({AdminGemCut}) => {
  return (
    <div class="content-container">
      <div class="card">
        <img src={AdminGemCut.imageUrl} alt="Apple Watch Series 7" />
        <h3 class="card-title">{AdminGemCut.name}</h3>

        <p class="card-description">{AdminGemCut.description}</p>

        <button class="Update">Update</button>
        <button class="Delete">Delete</button>
      </div>
    </div>
    
  )
}

export default AdminGemCutCard
