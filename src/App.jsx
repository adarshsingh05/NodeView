import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftSidebar from "./leftsidebar";
import CrawlerPage from "./CrawlerPage"; 
import Apps from "./homepage";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar is always visible */}
        <LeftSidebar />

        {/* Define Routes */}
        <div style={{ flexGrow: 1, padding: "16px" }}> {/* Main content area */}
          <Routes>
            <Route path="/all-wallets" element={<CrawlerPage />} />
            <Route path="/home" element={<Apps />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
