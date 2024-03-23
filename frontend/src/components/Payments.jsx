import React, { useState } from 'react';
import './Payments.css'; // Corrected import statement for CSS file

const Payments = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleSubmit = () => {
    // Here, you can implement validation for the payment amount
    // For simplicity, we'll directly use the entered payment amount
    console.log('Payment amount:', paymentAmount);
    // Implement payment processing logic here
    // For example, send payment request to server or interact with smart contract
    // After payment is made, set paymentCompleted to true to trigger the popup
    setPaymentCompleted(true);
  };

  return (
    <div className="container">
      <h2 className="primary">Scan QR Code to Make Payment</h2>
      <div className="qr-code">
      <img src="%PUBLIC_URL%/assets/download.jpg" alt="QR Code"/>
      </div>
      <div className="payment-form">
        <input
          type="text"
          placeholder="Enter payment amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit Payment</button>
      </div>
      {paymentCompleted && (
        <div className="popup">
          <p>Payment of {paymentAmount} has been completed.</p>
          <button onClick={() => setPaymentCompleted(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Payments;
