import React, { useState } from 'react';
import './Payments.css'; // Import CSS file

const Payments = () => {
  const [paymentAddress, setPaymentAddress] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [metaMaskAddress, setMetaMaskAddress] = useState('');

  // Simulated function to retrieve MetaMask address
  const getMetaMaskAddress = () => {
    // Simulated address for testing purposes
    const simulatedAddress = '0x1234567890abcdef';
    setMetaMaskAddress(simulatedAddress);
  };

  const handleSubmit = () => {
    // Verify if MetaMask address matches the provided payment address
    if (metaMaskAddress === paymentAddress) {
      // Here, you can implement payment processing logic
      console.log('Payment address verified:', paymentAddress);
      console.log('Payment amount:', paymentAmount);
      // After payment is verified, set paymentCompleted to true to trigger the popup
      setPaymentCompleted(true);
    } else {
      alert('MetaMask address does not match the payment address.');
    }
  };

  return (
    <div className="container-p">
      <h2 className="primary">Verify Payment with MetaMask</h2>
      <div className="payment-form">
        <input
          type="text"
          placeholder="Enter payment address"
          value={paymentAddress}
          onChange={(e) => setPaymentAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter payment amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
        <button onClick={getMetaMaskAddress}>Get MetaMask Address</button>
        <button onClick={handleSubmit}>Verify Payment</button>
      </div>
      {paymentCompleted && (
        <div className="popup">
          <p>Payment of {paymentAmount} to {paymentAddress} has been verified.</p>
          <button onClick={() => setPaymentCompleted(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Payments;
