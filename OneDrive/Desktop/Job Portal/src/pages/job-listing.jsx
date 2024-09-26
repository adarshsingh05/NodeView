import { getJobs } from '@/api/apiJobs'
import useFetch from '@/hooks/use-fetch'
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/job-card'
import { getCompanies } from '@/api/apiCompanies'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { SelectTrigger } from '@radix-ui/react-select'
import { SelectValue,SelectContent, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select'
import {State} from "country-state-city";

const JobListing = () => {
  const [searchQuery,setSearchQuery] = useState("");
  const [location,setLocation] = useState("");
  const [company_id,setcompany_id] = useState("");
  const{isLoaded} = useUser();

  // for save and unsave jobs

  const {
    loading:loadingJobs,
    fn:fnJobs, 
    data:jobs,
    
  } = useFetch(getJobs,{
    location,
    company_id,
    searchQuery
  });
  

  // for companies

  const {
    fn:fnCompanies, 
    data:companies  = [],
    
  } = useFetch(getCompanies);

  // use effect to filter and find companies
  useEffect(()=>{
    if(isLoaded) fnCompanies();
  },[isLoaded]);

  // use effect for the save unsave jobs
  useEffect(()=>{
    if(isLoaded) fnJobs();
  },[isLoaded, location, company_id, searchQuery]);

  // function to serch the job it is used in the form below - logic for the form action
  const handleSearch=(e)=>{
  e.preventDefault();
  let formData= new FormData(e.target);
  // /getting the data for the form 
  const query = formData.get("search-query");
  if(query) setSearchQuery(query);

  };
  

  if(!isLoaded || loadingJobs ){
    return <BarLoader className="mb-4" width ={"100%"} color='#36d7b7' />
  }
  
  
  return( <div> 
     <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
       Latest Jobs
      </h1>
     {/* add filters here */}
      <form onSubmit={handleSearch} className='h-14 flex w-full gap-2 items-center mb-3'>
        {/* input from the shadcn ui */}
        <Input type="text" placeholder="Search Jobs by Title ..."
        name="search-query"
        className="h-full flex-1 px-4 text-md"
        />
        <Button
        type="submit"
        className="h-full sm:w-28"
        variant="blue">
          Search

        </Button>
      
      </form>

      {/* div for the select boxes */}
      <div >

        {/* search by location filter */}
      <Select  value={location} onValueChange={(value)=>setLocation(value)}>
      <SelectTrigger >
        <SelectValue placeholder="Filter By Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {State.getStatesOfCountry("IN").map(({name})=>{
          return (
          <SelectItem key={name} value={name}>{name}</SelectItem>
          );
        })}

        </SelectGroup>
      </SelectContent>
    </Select>

    {/* search by company filter */}

    <Select value={company_id} onValueChange={(value)=>setcompany_id(value)}
      >
      <SelectTrigger >
        <SelectValue placeholder="Filter By Company Name" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {companies.map(({name,id})=>{
          return (
          <SelectItem key={name} value={id}>
            {name}</SelectItem>
          );
        })}

        </SelectGroup>
      </SelectContent>
    </Select>

    <Button
    variant="destructive" className ="sm:w-1/2" onClick={clearFilters}>
      Clear Filters
    </Button>
      </div>

    
     {loadingJobs && (
      <BarLoader className="mt-4" width ={"100%"} color='#36d7b7' />
     )}
      
      {loadingJobs ===false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs?.length? (
            jobs.map((job)=>{
              // a component to render the job we will create the job card
              return <JobCard key={job.id} job={job}
              savedInit={job?.saved?.length>0}
              />;
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
