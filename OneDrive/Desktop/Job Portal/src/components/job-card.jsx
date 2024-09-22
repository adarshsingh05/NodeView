import React from 'react'
import { CardHeader, CardTitle } from './ui/card'
import { useUser } from '@clerk/clerk-react';
import { Card } from './ui/card';
import { Trash2Icon } from 'lucide-react';


const JobCard = ({
    job,
    isMyJob= false,
    savedInit=false,
    onJobSaved=()=>{},
}) => {

    const{user}= useUser();

  return (
        <Card>
            <CardHeader>
                <CardTitle>
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
        </Card>
  )
}

export default JobCard
