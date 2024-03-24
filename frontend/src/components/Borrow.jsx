import React, { useState } from 'react'
import { Web3 } from "web3"
import Test from "../test.json"

const Borrow = () => {
    const [currentAccount, setCurrentAccount] = useState(null)
    
    const addUser = async () => {
      if(window.ethereum) {
        const contractAddress = "0xA94ab1FAF9795019440b9650708166eD5939EDd5"

        const abi = Test.abi
        console.log("ABI:", abi.length)

        // const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/"))
        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(abi, contractAddress)
        const tx = {
          from: currentAccount,
          to: contractAddress
        }

        // const res = await contract.methods.toLand(20, 10).send(tx)
        const res = await contract.methods.addUser().send(tx)

        console.log(res)
      }
    }

    const borrowing = async () => {
      if(window.ethereum) {
        const contractAddress = "0xA94ab1FAF9795019440b9650708166eD5939EDd5"

        const abi = Test.abi
        console.log("ABI:", abi.length)

        // const web3 = new Web3(new Web3.providers.HttpProvider("https://sepolia.infura.io/v3/"))
        const web3 = new Web3(window.ethereum);

        const contract = new web3.eth.Contract(abi, contractAddress)
        // const tx = {
        //   from: currentAccount,
        //   to: contractAddress,
        //   value:
        // }

        // const res = await contract.methods.toLand(20, 10).send(tx)
        const res = await contract.methods.toBorrow("abcd",20,40).call()

        console.log(res)

        // for (let i=0;i<res.length;i++){

        // }
      }
    }

      const getUserData = async () => {
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
          }

          // const res = await contract.methods.toLand(20, 10).send(tx)
          const res = await contract.methods.getUserData().send(tx)

          console.log(res)

          // for (let i=0;i<res.length;i++){

          // }
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
              <div className='buttons' style={{marginLeft: "250px", scale: "1.3"}}>
                  <button onClick={connectWallet} style={{marginRight: "50px"}}>Connect wallet</button>
                  <button onClick={addUser} style={{marginRight: "50px"}}>Add User</button>
                <button onClick={borrowing} style={{marginRight: "50px"}}>Borrowing</button>
                  <button onClick={getUserData} style={{marginRight: "50px"}}>Get User Data</button>
                  {/* <CardTemplate>
      
                  </CardTemplate> */}
                  <br />
              </div>
          )
  }

  
export default Borrow