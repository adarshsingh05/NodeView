import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import GithubStyleHeatmap from '@/components/GithubStyleHeatmap';

const InterviewRoom = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [date, setDate] = useState(new Date());

  return (
    <div>
      {/* gmeet, code editor and calendar */}
      <div className='gradient-title text-2xl font-extrabold sm:text-4xl lg:text-5xl text-center mb-12'>
        Welcome to the Interview Room, <span className='bg-gradient-to-r from-[#c96844] to-[#3b777f] bg-clip-text'>{user?.firstName}!!</span>
      
        </div>
      <div className='flex flex-col lg:flex-row w-full lg:justify-between items-center'>
        {/* GMeet Div */}
            <div className="rounded-sm dark:bg-gray-600 lg:w-[33%] mr-5 w-full border-[3px] border-[#41767c] mb-8 lg:mb-0">
            this is for the gmeet r
            </div>

            

       

        {/* Code Editor Div */}
        <div className='rounded-md bg-[#020817] lg:w-[33%] w-full border-[3px] border-[#c16947] mb-8 lg:mb-0'>
          <div className='bg-white dark:bg-gray-600 h-[15%] py-4'>
            <h2 className="text-xl font-extrabold mb-4 text-center">V-Jobs Live Code Editor</h2>
          </div>
          <div className='flex flex-col lg:flex-row justify-between'>
            <div className='w-[40%] h-[35%] mx-auto lg:mx-0'>
              <img src='public/codeeditorimage.png' alt='code editor' />
            </div>
            <div className='text-center text-xl font-bold mt-4 lg:mt-16 lg:mr-8'>
              AI Powered Code Editor
            </div>
          </div>
          <p className='text-center'>
            This is V-Jobs own code editor supporting multiple languages. An AI powered code editor that allows you to check code plagiarism in real-time.
          </p>
          <Button
            variant="blue" onClick={() => navigate('/userpage')}
            className='text-center ml-[32%] mt-4 mb-3'>
            <p className='text-l'>Open Live Code Editor</p>
          </Button>
        </div>

         {/* Separator Div */}
         <div className="hidden lg:block h-[380px] bg-blue-500 w-[2px] mx-5"></div>

        {/* Calendar Div */}
        <div className='border-[3px] rounded-sm border-[#41767c]  w-["300px"] mx-2'>
          <div className="flex justify-center items-center">
            <div className="bg-white dark:bg-gray-600">
              <h2 className="text-xl font-extrabold mb-4 mt-4 text-center w-full">Your Calendar</h2>
              <Calendar
                onChange={setDate}
                value={date}
                className="text-gray-900 dark:text-gray-600"
              />
              <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
                Selected Date: {date.toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>

        <div className='text-center text-xl font-semibold mb-4 mt-14'> Your Login Consistency</div>
        <div className='rounded-md bg-[#020817]  w-full border-[3px] border-[#c16947] mb-8 lg:mb-0'>  <GithubStyleHeatmap/></div>
      </div>
    </div>
  );
}

export default InterviewRoom;