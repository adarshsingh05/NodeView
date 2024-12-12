'use client'; // Necessary for client-side rendering

import { useState } from 'react';
import axios from 'axios';
import "./CrawlerPage.css";
const Extractor = () => {
  const [walletId, setWalletId] = useState('');
  const [walletDetails, setWalletDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [cardanoWalletId, setCardanoWalletId] = useState('');
  const [cardanoTransactions, setCardanoTransactions] = useState([]);
  const [error, setError] = useState('');

  const fetchWalletDetails = async () => {
    setError('');
    setWalletDetails(null);
    setTransactions([]);

    if (!walletId) {
      setError('Please enter a wallet ID.');
      return;
    }

    try {
      // Fetch wallet balance
      const balanceResponse = await axios.get(
        `https://api.etherscan.io/api`,
        {
          params: {
            module: 'account',
            action: 'balance',
            address: walletId,
            tag: 'latest',
            apikey: "DFDT36ETH2KWIIV5CGG3AQVZUQRFERWE8N",
          },
        }
      );

      if (balanceResponse.data.status === '1') {
        const balanceInEther = parseFloat(balanceResponse.data.result) / 10 ** 18;
        setWalletDetails({ balance: balanceInEther });
      } else {
        setError(balanceResponse.data.message || 'Unable to fetch wallet balance.');
        return;
      }

      // Fetch last 10 transactions
      const transactionsResponse = await axios.get(
        `https://api.etherscan.io/api`,
        {
          params: {
            module: 'account',
            action: 'txlist',
            address: walletId,
            startblock: 0,
            endblock: 99999999,
            sort: 'desc',
            apikey: "DFDT36ETH2KWIIV5CGG3AQVZUQRFERWE8N",
          },
        }
      );

      if (transactionsResponse.data.status === '1') {
        setTransactions(transactionsResponse.data.result.slice(0, 10));
      } else {
        setError(transactionsResponse.data.message || 'Unable to fetch transactions.');
      }
    } catch (err) {
      setError('An error occurred while fetching wallet details or transactions.');
    }
  };

  const fetchCardanoTransactions = async () => {
    setError('');
    setCardanoTransactions([]);
  
    if (!cardanoWalletId) {
      setError('Please enter a Cardano ZKEVM wallet ID.');
      return;
    }
  
    try {
      const cardanoResponse = await axios.get(
        `https://api-cardona-zkevm.polygonscan.com/api`,
        {
          params: {
            module: 'account',
            action: 'txlist',
            address: cardanoWalletId,
            startblock:0,
            endblock:99999999,
          
            sort:'desc',
            apikey: "3ZTEU7Y9CBR9UPHEZHC9GZU25Y9ZB44USQ",
          },
        }
      );
  
      if (cardanoResponse.data.status === '1') {
        const transactions = cardanoResponse.data.result;
        setCardanoTransactions(transactions);
        
        const extractedTransactions = cardanoResponse.data.result.map(tx => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          timestamp: tx.timeStamp,
        }));
  
        // Sending data to the backend
        const response = await axios.post('https://node-backend-jb9i.onrender.com/api/sendtransactions', { transactions: extractedTransactions });
        
        // Log the response from the backend
        console.log("Backend Response:", response.data);
        
        // Optionally check the success status and show a message
        if (response.status === 200) {
          console.log('Data sent successfully to the backend.');
        } else {
          console.log('Failed to send data to the backend.');
        }
        
      } else {
       console.log(cardanoResponse.data.message || 'Unable to fetch Cardano transactions.');
      }
    } catch (err) {
      console.log('An error occurred while fetching Cardano ZKEVM transactions.',err);
    }
  };
  

  return (
    <div className="crawler-container">
      <div className="upperdiv">
        <div className="secondDiv">
          <p className="firstText">CryptoVigil's Extraction Portal</p>
        </div>
        <div className="third div">
          <input
            type="text"
            className="searchBar"
            value={walletId}
            onChange={(e) => setWalletId(e.target.value)}
            placeholder="Search for Ethereum Wallet"
          />
          <button className="searchButton" onClick={fetchWalletDetails}>Search</button>
        </div>
        <div className="third div">
          <input
            type="text"
            className="searchBar"
            value={cardanoWalletId}
            onChange={(e) => setCardanoWalletId(e.target.value)}
            placeholder="Search for Cardano ZKEVM Wallet"
          />
          <button className="searchButton" onClick={fetchCardanoTransactions}>Search</button>
        </div>
      </div>

      <div className="maincard"></div>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
        {walletDetails && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Wallet Details:</h2>
            <p><strong>Balance:</strong> {walletDetails.balance} ETH</p>
          </div>
        )}
        {transactions.length > 0 && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Last 10 Ethereum Transactions--:</h2>
            <ul className="list-disc pl-5">
              {transactions.map((tx, index) => (
                <li key={index} className="mb-2">
                  <p><strong>Hash:</strong> {tx.hash}</p>
                  <p><strong>From:</strong> {tx.from}</p>
                  <p><strong>To:</strong> {tx.to}</p>
                  <p><strong>Value:</strong> {parseFloat(tx.value) / 10 ** 18} ETH</p>
                  <p><strong>Date:</strong> {new Date(tx.timeStamp * 1000).toLocaleString()}</p>
              
                </li>
              ))}
            </ul>
          </div>
        )}
  {cardanoTransactions.length > 0 && (
  <div className="mt-4 bg-gray-100 p-4 rounded">
    <h2 className="text-lg font-bold mb-2">Last 10 Cardano ZKEVM Transactions:</h2>
    <ul className="list-disc pl-5">
      {cardanoTransactions.map((tx, index) => {
        const valueInEth = parseFloat(tx.value) / 10 ** 18; // Convert value to ETH
        const mapUrl =
          valueInEth === 0.02 
            ? "https://www.google.com/maps/place/VIT-AP+University/@16.4970554,80.4991965,804m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a35f27d40f21c55:0x1490eacd54859850!8m2!3d16.4970554!4d80.4991965!16s%2Fg%2F11c1_97gpv?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            : "https://www.google.com/maps/place/23%C2%B014'55.1%22N+77%C2%B030'08.7%22E/@23.248629,77.5017733,200m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d23.248629!4d77.502417?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D";

        return (
          <li key={index} className="mb-2">
            <p><strong>Hash:</strong> {tx.hash}</p>
            <p><strong>From:</strong> {tx.from}</p>
            <p><strong>To:</strong> {tx.to}</p>
            <p><strong>Value:</strong> {valueInEth} ETH</p>
            <p><strong>Date:</strong> {new Date(tx.timeStamp * 1000).toLocaleString()}</p>
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                View
              </button>
            </a>
          </li>
        );
      })}
    </ul>
  </div>
)}


      </div>
    </div>
  );
};

export default Extractor;
