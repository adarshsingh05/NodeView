// src/components/AadharCardViewer.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchAadharCards } from "./apiadhar";

const AadharCardViewer = () => {
    const { user } = useUser();

    // Check if user is authenticated
    if (!user) {
      return <p>Please log in to view your Aadhar cards.</p>;
    }
  
    // Define your user ID and token here
    const userId = user.id; // Get actual user ID from Clerk/ Update with actual user ID
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Assuming you store the token in local storage

  const [aadharCards, setAadharCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAadharCards = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const cards = await fetchAadharCards(userId, token);
        setAadharCards(cards);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAadharCards();
  }, [userId, token]);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading Aadhar cards...</p>;
  if (error) return <p>Error fetching Aadhar cards: {error}</p>;

  return (
    <div>
      <h2>Your Aadhar Cards</h2>
      {aadharCards.length === 0 ? (
        <p>No Aadhar cards found.</p>
      ) : (
        <ul>
          {aadharCards.map((card) => (
            <li key={card.id}>
              <span>Aadhar Card URL: {card.aadhar_url}</span>
              <button onClick={() => handleDownload(card.aadhar_url)}>Download</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AadharCardViewer;
