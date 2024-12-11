
'use client'; // Necessary for client-side rendering

import { useState } from 'react';
import axios from 'axios';
import "./CrawlerPage.css";

const Extractor = ({ walletIds }) => {
  const [walletId, setWalletId] = useState('');
  const [walletDetails, setWalletDetails] = useState(null);
  const [transactions, setTransactions] = useState([]);
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
  return (
    <div className="crawler-container">
      <div className="upperdiv">
        <div className="secondDiv">
          <p className="firstText">CryptoVigil's Extraction Portal </p>
         
        </div>
        <div className="third div">
            <input
              type="text"
              className="searchBar"
              value={walletId}
              onChange={(e) => setWalletId(e.target.value)}
              placeholder="Search for Wallet using ID or name"
            />
            <button className="searchButton"
             onClick={fetchWalletDetails}>Search</button>
          </div>
        <div className="third div"></div>
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
            <h2 className="text-lg font-bold mb-2">Last 10 Transactions:</h2>
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
      </div>
    </div>
  );
};

export default Extractor;
