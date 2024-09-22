import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/job-card'
const JobListing = () => {
  const [searchQuery,setSearchQuery] = useState("");
  const [location,setLocation] = useState("");
  const [company_id,setcompany_id] = useState("");
  const{isLoaded} = useUser();

  const {
    fn:fnJobs, 
    data:jobs,
    loading:loadingJobs 
  } = useFetch(getJobs,{
    location,
    company_id,
    searchQuery
  });
 

 
  useEffect(()=>{
    if(isLoaded) fnJobs();
  },[isLoaded, location, company_id, searchQuery]);

  // debugging

  // useEffect(() => {
  //   if (jobs) {
  //     console.log("Jobs Data:", jobs); // Log jobs data
  //   }
  // }, [jobs]);

  if(!isLoaded || loadingJobs ){
    return <BarLoader className="mb-4" width ={"100%"} color='#36d7b7' />
  }
  
  
  return( <div> 
     <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
       Latest Jobs
      </h1>
     {/* add filters here */}
    
     {loadingJobs && (
      <BarLoader className="mt-4" width ={"100%"} color='#36d7b7' />
     )}
      
      {loadingJobs ===false && (
        <div>
          {jobs?.length? (
            jobs.map((job)=>{
              // a component to render the job we will create the job card
              return <JobCard key={job.id} job={job}/>
            })

          ):(
            <div> No Jobs Found</div>
          )}
        </div>
      )}

     </div>
  );
}
export default JobListing
