import React from 'react'
import "./Card.css"

const CardTemplate = () => {
    const handleBuy = () => {
        console.log("Buying this trade.")
    }
    return (
    <div className="card hover">
        <div className="card-body">
        <h5 className="card-title">Amount</h5>
        <p className="card-text">
        Address: 
        <br />
        Amount:
        <br />
        Interest:
        <br />
      </p>
      <button onClick={handleBuy}>Buy</button>
    </div>
  </div> 
  )
}

export default CardTemplate