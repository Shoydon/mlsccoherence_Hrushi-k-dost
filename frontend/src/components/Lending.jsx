import React, { useState } from 'react';
import { Web3 } from "web3";
import Test from "../test.json";

const Lending = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);

  const connectWallet = async () => {
    if(window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts"})
        .then((res) => {
          setCurrentAccount(res[0])
        })
  
  
        window.ethereum.enable()
        // await window.ethereum.request({
        //   method: "wallet_addEthereumChain",
        //   params: [{chainId: "80001"}]
        // })
        console.log("Current address:", currentAccount)
      }
    }

  const toLand = async () => {
    if (window.ethereum) {
      // Your code for interacting with the contract
      const contractAddress = "0xA94ab1FAF9795019440b9650708166eD5939EDd5";
      const abi = Test.abi;
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(abi, contractAddress);
      const tx = {
        from: currentAccount,
        to: contractAddress,
        gas: 1000000
      };

      if (amount === "") {
        amount = 10;
      }
      if (rate === "") {
        rate = 5;
      }

      const res = await contract.methods.toLand(amount, rate).send(tx);
      console.log("Transaction Result:", res);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Amount:", amount, "Rate:", rate);
    toLand(); // Call toLand function without passing arguments
  };

  return (
    <div>
      <div>Lend some amount!</div>
      <button onClick={connectWallet}>Connect Wallet</button>
      <form style={{ marginLeft: "400px", scale: "1.3" }} onSubmit={handleSubmit}>
        <div>Amount:</div>
        <input name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} type='number' />
        <br />
        <br />
        <br />
        <div>Rate</div>
        <input name='rate' value={rate} onChange={(e) => setRate(e.target.value)} type='number' />
        <br />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Lending;

// import React, { useState } from 'react'
// import { Web3 } from "web3"
// import Test from "../test.json"

// const Lending = () => {
//   const [currentAccount, setCurrentAccount] = useState(null)
//   const [amount, setAmount] = useState(0)
//   const [rate, setRate] = useState(0)
      // const connectWallet = async () => {
      //   if(window.ethereum) {
      //       await window.ethereum.request({ method: "eth_requestAccounts"})
      //       .then((res) => {
      //         setCurrentAccount(res[0])
      //       })
      
      
      //       window.ethereum.enable()
      //       // await window.ethereum.request({
      //       //   method: "wallet_addEthereumChain",
      //       //   params: [{chainId: "80001"}]
      //       // })
      //       console.log("Current address:", currentAccount)
      //     }
      //   }
//       const toLand = async (amount, rate) => {
//       if(window.ethereum) {
//         const contractAddress = "0xA94ab1FAF9795019440b9650708166eD5939EDd5"

//         const abi = Test.abi

//         // const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/"))
//         const web3 = new Web3(window.ethereum);

//         const contract = new web3.eth.Contract(abi, contractAddress)
//         setCurrentAccount("0xi0xC16Ea3B117f92Df81EbedF3E56E6Bf0A62A9A4Da")
//         const tx = {
//           from: currentAccount,
//           to: contractAddress
//         }

//         if (amount == "") {
//           amount = 10
//         }
//         if (rate == "") {
//           rate = 5
//         }
//         // const res = await contract.methods.toLand(20, 10).send(tx)
//         const res = await contract.methods.toLand(20,10).send(tx)
//         console.log("first")
//         console.log(res)
//         console.log("second")
//       }
//     }

//     const handleSubmit = (amount, rate) => {
//       console.log("Amount:", amount,"Rate:", rate)
//       toLand(amount, rate)
//     }
//   return (
//     <div>
//       <div>Lend some amount!</div>
//       <button onClick={connectWallet}>Connect Wallet</button>
//       <form style={{marginLeft: "400px", scale: "1.3"}} onSubmit={handleSubmit}>
//         <div>Amount:</div>
//         <input name='amount' value={amount} onChange={(e) => setAmount(e.target.value)} type='number' />

//         <br />
//         <br />
//         <br />
//         <div>Rate</div>
//         <input name='rate' value={rate} onChange={(e) => setRate(e.target.value)} type='number' />
//         <br />
//         <br />
//         {/* <input type='submit' /> */}
//         <button onClick={handleSubmit}>Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Lending
