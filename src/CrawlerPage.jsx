import React, { useEffect, useState } from "react";
import "./CrawlerPage.css";

const CrawlerPage = ({ walletId }) => {
  const [wallets, setWallets] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [searchQuery, setSearchQuery] = useState(""); // State to handle search input
  const [highlightedWallet, setHighlightedWallet] = useState(null); // State for highlighting

  useEffect(() => {
    // Fetch data from the backend
    const fetchWallets = async () => {
      try {
        const response = await fetch(
          `https://node-backend-jb9i.onrender.com/wallets/all`
        );
        const data = await response.json();
        setWallets(data); // Store the fetched data in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setLoading(false);
      }
    };

    fetchWallets();
  }, [walletId]);

  const handleSearch = () => {
    console.log("hit");
    const foundWallet = wallets.find(
      (wallet) =>
        wallet.id.includes(searchQuery) || wallet.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("foundWallet", foundWallet);
    setHighlightedWallet(foundWallet ? foundWallet.id : null);
    console.log(foundWallet.id)
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="crawler-container">
      <div className="upperdiv">
        <div className="secondDiv">
          <p className="firstText">Active Nodes: </p>
          <p className="secondText">{wallets.length} Currently On Network</p>
        </div>
        <div className="third div">
          <input
            type="text"
            className="searchBar"
            placeholder="Search for Wallet using ID or name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="searchButton" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="maincard">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className={` ${
              highlightedWallet === wallet.id ? "highlighted" : "cardstructure"
            }`}
          >
            <h3 className="wallet-id">Wallet ID: {wallet.id.slice(0, 5)}...</h3>
            <p>Name: {wallet.label}</p>
            <div className="button-container">
              <button className="card-button">Mark</button>
              <button className="card-attack">Attack</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrawlerPage;
