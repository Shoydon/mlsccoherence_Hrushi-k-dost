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
      window.ethereum.request({ method: "eth_requestAccounts"})
      .then((res) => {
        accountChangeHandler(res[0])
      })

      // setProvider(new Web3BaseProvider.providers.HttpProvider("http://localhost:7545"))
    }
  }

  const handleSendTxn = async (sender, receiver, amount) => {
    const private_key = "0xef9a64aec86e24cfa1015fac2eed6a678efb23358904d361ea1663f8e71bc13e"
    const web3 = new Web3(provider)

    const account = web3.eth.accounts.privateKeyToAccount(private_key)
    const tx = {
      from: sender, 
      to: receiver,
      value: web3.utils.toWei(amount, "ether")
    }

    web3.eth.accounts.signTransaction(tx, private_key, (err, txHash) => {
      if (err) {
        console.error("Error sending transaction:", err)
      }else {
        console.log("Transaction Hash:", txHash)
      }
    })
  
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
