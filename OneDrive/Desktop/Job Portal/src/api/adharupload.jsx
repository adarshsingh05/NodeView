import React, { useState } from 'react';
import { uploadAadharCard } from './apiadhar';
import { useUser } from '@clerk/clerk-react';

const AadharUpload = () => {
    const { user } = useUser();

  // Check if user is defined
  if (!user) {
    return <p>Please log in to upload your Aadhar card.</p>;
  }
  console.log(user.id);
  const id= user.id;
  const [aadharFile, setAadharFile] = useState(null);
  const [candidateId, setCandidateId] = useState(id);

  const handleUpload = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZ3JqeXpqcWxzb3psd2NmYWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjcyNjc0MSwiZXhwIjoyMDQyMzAyNzQxfQ.PQhre7cPVE8LSQSMANHD3EsmojWT0pvAzbjAwwx5An0'; // Assuming you store the token in local storage
      const aadharData = { aadharFile, candidate_id: candidateId };
      const result = await uploadAadharCard(token, aadharData);
      console.log('Aadhar Card uploaded successfully:', result);
    } catch (error) {
      console.error('Error uploading Aadhar Card:', error);
    }
  };

  return (
    <div>
      <h2>Upload Aadhar Card</h2>
      <input
        type="text"
        placeholder="Candidate ID"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setAadharFile(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload Aadhar Card</button>
    </div>
  );
};

export default AadharUpload;
