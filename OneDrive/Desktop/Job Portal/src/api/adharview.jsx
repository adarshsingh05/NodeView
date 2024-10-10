// src/components/AadharCardViewer.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { fetchAadharCards } from "./apiadhar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-lg h-[400px] overflow-y-auto bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">View Your Documents</h2>

        {aadharCards.length === 0 ? (
          <p className="text-gray-400 text-center">No Documents found.</p>
        ) : (
          <div className="space-y-2">
            {aadharCards.map((card) => (
              <Card key={card.id} className="shadow-md rounded-lg p-4  h-[120px] flex flex-row justify-between">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Document</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex flex-row justify-between">
                  <p className="text-sm text-gray-300 mr-12 mt-8 ">Document</p>
                  <Button 
                    onClick={() => handleDownload(card.aadhar_url)} 
                    className="bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mt-6"
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AadharCardViewer;
