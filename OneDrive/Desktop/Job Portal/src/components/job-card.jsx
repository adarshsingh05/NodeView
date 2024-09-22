import React from 'react'
import { CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { useUser } from '@clerk/clerk-react';
import { Card } from './ui/card';
import { MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';


const JobCard = ({
    job,
    isMyJob= false,
    savedInit=false,
    onJobSaved=()=>{},
}) => {

    const{user}= useUser();

  return (
        <Card className='mb-4'>
            <CardHeader>
                <CardTitle className='flex justify-between font-bold'>
                    {job.title}
            
            {/* if its my job we will add a trash icon to delete it */}
                    {!isMyJob && (
                        <Trash2Icon
                        fill="red"
                        size={18}
                    className="text-red-200 cursor-pointer"/>
                    )}
            </CardTitle> 
            </CardHeader>
            <CardContent className='flex flex-col gap-4 flex-1'>
                <div className='flex justify-between'>
                    {job.company && <img src= {job.company.logo_url} className='h-6'/>}
                  
                    <div className='flex gap-2 items-center'>
                        <MapPinIcon size={15}/> {job.location}
                    </div>
                </div>
                    <hr/>
                    
                    {job.description.substring(0,job.description.indexOf('.'))}
                    {!job.description && "no description found"}
            </CardContent>
            <CardFooter className='flex gap-2'>
                <Link to= {`/jobs/${job.id}`} className='flex-1'> 
                <Button variant="secondary" className="w-full">
                    More Details
                </Button>
                 </Link>

                 <Heart size={20} stroke="red" fill='red'/>

            </CardFooter>
            <hr/>
        </Card>
  )
}

export default JobCard
