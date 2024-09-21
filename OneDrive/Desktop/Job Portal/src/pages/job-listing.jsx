import { getJobs } from '@/api/apiJobs'
import { useSession } from '@clerk/clerk-react'
import React, { useEffect } from 'react'

const JobListing = () => {
  // in order to send the token
  const {session}=useSession()
  // function to fetch the jobs token
  const fetchJobs= async()=>{
    const supabaseAccessToken= await session.getToken({
      template:'supabase',
    });
    // this data will be passed to function of the apijobs
    const data=await getJobs(supabaseAccessToken);
    console.log(data);
    
  }
  useEffect(() => {
    fetchJobs();
   
    },
   []); // Fetch jobs only when session is available
  
  return (
    <div>
      Job Listings page
    </div>
  )
}

export default JobListing
