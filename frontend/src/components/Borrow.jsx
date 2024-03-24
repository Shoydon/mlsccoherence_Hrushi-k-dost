import React, { useState } from 'react'
import { Web3 } from "web3"
import Test from "../test.json"
import CardTemplate from './Card'

const Borrow = () => {
    const [currentAccount, setCurrentAccount] = useState(null)
    const getLoanData = async () => {
        if(window.ethereum) {
          const contractAddress = "0xA94ab1FAF9795019440b9650708166eD5939EDd5"

          const abi = Test.abi
          console.log("ABI:", abi.length)

          // const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/"))
          const web3 = new Web3(window.ethereum);

          const contract = new web3.eth.Contract(abi, contractAddress)
          const tx = {
            from: currentAccount,
            to: contractAddress,
            value: Math.pow(10, 18) * 10,
          }

          // const res = await contract.methods.toLand(20, 10).send(tx)
          const res = await contract.methods.getUserData().call()

          console.log(res)
        }
    }

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
    return (
        <div>
            <button onClick={connectWallet}>Connect wallet</button>
            <br />
            <br />
            <br />
            <button onClick={getLoanData}>Get Loan Data</button>
            <CardTemplate>

            </CardTemplate>
            <br />
        </div>
    )
}

export default Borrow