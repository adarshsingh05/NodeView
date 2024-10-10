import React, { useState } from 'react';
import { uploadAadharCard } from './apiadhar';
import { useUser } from '@clerk/clerk-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AadharUpload = () => {
  const { user } = useUser();

  // Check if user is defined
  if (!user) {
    return <p>Please log in to upload your Aadhar card.</p>;
  }
  console.log(user.id);
  const id = user.id;
  const [aadharFile, setAadharFile] = useState(null);
  const [candidateId, setCandidateId] = useState(id);
  const [success, setSuccess] = useState(false); // State for success message

  const handleUpload = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Assuming you store the token in local storage
      const aadharData = { aadharFile, candidate_id: candidateId };
      const result = await uploadAadharCard(token, aadharData);
      console.log('Aadhar Card uploaded successfully:', result);

      // Show success pop-up
      setSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error uploading Aadhar Card:', error);
    }
  };

  return (
    <div className=" flex mt-10  h-[380px]">
      <Card className="max-w-lg w-[500px] shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Upload Your Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="candidateId">
              Candidate ID (Auto-filled)
            </label>
            <input
              type="text"
              id="candidateId"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300 text-red-500"
              placeholder="Candidate ID"
              value={candidateId}
              onChange={(e) => setCandidateId(e.target.value)}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2 mt-6" htmlFor="aadharFile">
              Upload Your Files
            </label>
            <input
              type="file"
              id="aadharFile"
              className="w-full px-3  py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setAadharFile(e.target.files[0])}
            />
          </div>

          <div className="text-center">
            <Button
              className="w-full mt-8 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              onClick={handleUpload}>
              Upload Documents
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Success Pop-up */}
      {success && (
        <div className="absolute top-20 flex justify-center items-center bg-green-500 text-white px-4 py-2 rounded-md shadow-md animate-fade-in-out transition-opacity duration-500">
          <div className="flex items-center ">
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Documents uploaded successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AadharUpload;
