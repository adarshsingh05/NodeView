import React from "react";
import "./CrawlerPage.css";

const CrawlerPage = () => {
  return (
    <div className="crawler-container">
      <div className="upperdiv">
        <div className="secondDiv">
          <p className="firstText">Active Nodes: </p>
          <p className="secondText">61 Currently On Network</p>
        </div>
        <div className="third div">
          <input
          type="text"
          className="searchBar"
          placeholder="Search for Wallet using ID or name"
          />
          <button className="searchButton">Search</button>

        </div>
      </div>
      <span className="crawler-text">
        This is some text inside the crawler page!
      </span>
    </div>
  );
};

export default CrawlerPage;
