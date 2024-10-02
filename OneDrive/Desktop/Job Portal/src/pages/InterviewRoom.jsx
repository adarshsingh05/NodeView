import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const InterviewRoom = () => {
    const navigate = useNavigate();
    const { user } = useUser();


    const [date, setDate] = useState(new Date()); // Make sure both date and setDate are declared
  return (
    <div>
     {/* gmeet, code editor and calender */}
     <div className='gradient-title text-2xl font-extrabold sm:text-4xl lg:text-5xl text-center mb-12 '> Welcome to the Interview Room, <span className='bg-gradient-to-r from-[#c96844] to-[#3b777f] bg-clip-text'>{user?.firstName } !!</span></div>
        <div className='rounded-sm  flex flex-row w-[100%] justify-between'>

        
            <div className='rounded-sm   dark:bg-gray-600 w-[33%] border-[3px] border-[#41767c]'>
                this is for the gmeet
            </div>
            <div className='rounded-md bg-[#020817] w-[33%] border-[3px] border-[#c16947]'>
                <div className='  bg-white dark:bg-gray-600 h-[15%] py-4'>
                    <h2 className="text-xl font-extrabold mb-4 text-center "> V-Jobs Live Code Editor </h2> 
                </div>
                {/* div for image and heading */}
                <div className='flex flex-row justify-between'>
                    <div className='w-[40%] h-[35%]'> <img src='public/codeeditorimage.png'></img></div>
                    <div className='text-center text-xl font-bold  mt-16 mr-8'> AI Powered Code Editor</div>
                </div>
                <div>
                    <p className='text-center'> This is V-Jobs own code editor supporting multiple languages. An AI powered code editor that allow you to check the code plagarism in real time</p>
                    <Button
                    variant="blue" onClick={() => navigate('/userpage')}
                    className='text-center ml-[32%] mt-4'>
                       <p className='text-l'>Open Live Code Editor</p>
                    </Button>
                </div>
            </div>

            <div className='border-[3px] rounded-sm border-[#41767c]'>

                <div className="flex justify-center items-center ">
                    <div className="  bg-white dark:bg-gray-600  ">
                        <h2 className="text-xl font-extrabold mb-4 mt-4 text-center ">Your Calender</h2>
                        <Calendar
                        onChange={setDate}
                        value={date}
                        className="text-gray-900 dark:text-gray-600" // Add Tailwind classes or overwrite default styles if needed
                        />
                        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                        Selected Date: {date.toDateString()}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default InterviewRoom
