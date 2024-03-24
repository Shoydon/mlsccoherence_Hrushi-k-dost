import React, { useState } from 'react';
import { Web3 } from "web3";
import './Payments.css'; // Import CSS file

const Payments = () => {
  const [address, setAddress] = useState('')
  const [paymentAddress, setPaymentAddress] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [metaMaskAddress, setMetaMaskAddress] = useState('');
  const [provider, setProvider] = useState(null)

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


  const connectAccount = () => {
    if(window.ethereum) {
      window.ethereum.request({ method: "eth_accounts"})
      .then((res) => {
        accountChangeHandler(res[0])
      })

      window.ethereum.enable()
    }
  }

  const handleSendTxn = async (sender, receiver, amount) => {
    console.log("Txn")
    console.log("Sender:", sender, "Receiver:", receiver, "value:", amount)
    const web3 = new Web3(window.ethereum)
    const tx = {
      from : sender,
      to: receiver,
      value: 1000,
      gas: "30000"
    }

    const txn = await web3.eth.sendTransaction(tx)
    const txnHash = txn.transactionHash
    console.log("Transaction hash:", txnHash)

  }

  const accountChangeHandler = (account) => {
    setAddress(account)
  }

  return (
    <div className="container-p">
      
      {address ? <p style={{'fontSize': "18px"}}>Address: {address}</p> : <button onClick={connectAccount}>Connect account</button>}
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
        {/* <button onClick={getMetaMaskAddress}>Get MetaMask Address</button> */}
        <button onClick={() => handleSendTxn(address, paymentAddress, paymentAmount)}>Verify Payment</button>
      </div>
      {paymentCompleted && (
        <div className="popup">
          <p>Payment of {paymentAmount} to {paymentAddress} has been verified.</p>
          <button onClick={() => handleSendTxn(address, paymentAddress, paymentAmount)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Payments;
