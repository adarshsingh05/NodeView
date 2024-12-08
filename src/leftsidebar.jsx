import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./LeftSidebar.css"; // Import the external CSS file for sidebar styling

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <h4>CryptoVigil</h4>
      <div className=" flex flex-col">
        {/* Use Link to navigate to the All Wallets page */}
        <Link to="/home"><span>Network</span></Link>
        <Link to="/all-wallets"><span>Crawler </span></Link>
        <Link to="/extractor"><span>Extractor </span></Link>
      </div>
    </div>
  );
};

export default LeftSidebar;
