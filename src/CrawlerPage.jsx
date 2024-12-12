import React, { useEffect, useState } from "react";
import "./CrawlerPage.css";
import TypingEffect from "react-typing-effect";

const CrawlerPage = ({ walletId }) => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transactionResponse, setTransactionResponse] = useState(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch(
          `https://node-backend-jb9i.onrender.com/wallets/all`
        );
        const data = await response.json();
        setWallets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const handleTransactionSubmit = async () => {
    try {
      const response = await fetch(
        `http://172.16.56.124:3000/api/checks/0x18a7ca347ae1b0be81af7ab4be10a624846fe8ff5df8bfc73c18dbe5905de906/${receiverAddress}/${senderAddress}`
      );
      const data = await response.json();
      setTransactionResponse(data);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
      setTransactionResponse({ error: "Failed to fetch transaction data." });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const renderTransactionDetails = (response) => {
    if (response.error) {
      return <p className="error">{response.error}</p>;
    }

    return (
      <div className="transaction-details">
        <div className="level">
          <h3>Level 1</h3>
          <p><strong>Spam:</strong> {response.level1.spam ? "Yes" : "No"}</p>
          <p><strong>Transaction Hash:</strong> {response.level1.transaction}</p>
        </div>
        <div className="level">
          <h3>Level 2</h3>
          <p><strong>Spam:</strong> {response.level2.spam ? "Yes" : "No"}</p>
          <p><strong>Message:</strong> {response.level2.message}</p>
        </div>
        <div className="level">
          <h3>Level 3</h3>
          <p><strong>Spam:</strong> {response.level3.spam ? "Yes" : "No"}</p>
          <p><strong>Possible Countries:</strong> {response.level3.possibleCountries.join(", ") || "None"}</p>
          <p><strong>IP Details:</strong> {JSON.stringify(response.level3.myIpDetails)}</p>
        </div>
        <div className="level">
          <h3>Level 4</h3>
          <p><strong>Result:</strong> {JSON.stringify(response.level4.result)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="crawler-container">
      <div className="upperdiv">
        <div className="secondDiv">
          <p className="firstText">Active Nodes: </p>
          <p className="secondText">
            {wallets.length} Currently On Network{" "}
            <TypingEffect
              text={["....."]}
              speed={100}
              eraseDelay={1000}
              typingDelay={500}
              cursor="|"
            />
          </p>
        </div>
        <div className="form-section">
          <input
            type="text"
            placeholder="Sender Address"
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Receiver Address"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            className="input-field"
          />
          <button onClick={handleTransactionSubmit} className="submit-button">
            Submit Transaction
          </button>
        </div>
      </div>

      {transactionResponse && (
        <div className="transaction-response">
          <h2>Transaction Details</h2>
          {renderTransactionDetails(transactionResponse)}
        </div>
      )}

      <div className="maincard">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="cardstructure">
            <h3 className="wallet-id">Wallet ID: {wallet.id.slice(0, 5)}...</h3>
            <p>Name: {wallet.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrawlerPage;