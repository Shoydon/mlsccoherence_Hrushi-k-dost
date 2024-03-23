import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract'; // Assuming you're interacting with smart contracts

// Import your custom components and styles
import Navbar from './components/Navbar';
import Home from './components/Home';
import Borrow from './components/Borrow';
import Lend from './components/Lend';
import Trade from './components/Trade';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  // State variables for user authentication, contract instances, etc.
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Initialize Web3
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.enable();
          setWeb3(web3Instance);
        } else if (window.web3) {
          setWeb3(window.web3);
        } else {
          // User doesn't have MetaMask or any other compatible browser extension
          // Handle this case or prompt user to install MetaMask
        }

        // Initialize contract instance
        const contractInstance = new Contract(ABI, contractAddress); // Use your contract ABI and address
        setContract(contractInstance);

        // Get user accounts
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);

        setLoading(false);
      } catch (error) {
        console.error('Error while initializing Web3:', error);
      }
    };

    initWeb3();
  }, []);

  // Render loading spinner while Web3 and contract are being initialized
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar accounts={accounts} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/borrow" render={(props) => <Borrow {...props} web3={web3} accounts={accounts} contract={contract} />} />
          <Route path="/lend" render={(props) => <Lend {...props} web3={web3} accounts={accounts} contract={contract} />} />
          <Route path="/trade" render={(props) => <Trade {...props} web3={web3} accounts={accounts} contract={contract} />} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
