import React, { useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Notes from '@/components/Notes';
import { useEffect } from 'react';



const InterviewRoom = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true); // Declare the loading state

  // interview meet
  const[value, setValue] = useState();
  const navigater = useNavigate()
  const handlejoinRoom =useCallback(()=>{
navigate(`/room/${value}`)
  },[navigater,value])

  // Define the tasks array
  const initialTasks = [
      {
          id: 1,
          eventName: "Coding Interview",
          description: "Technical round focusing on DSA.",
          date: "2024-10-05",
          isCompleted: false,
      },
      {
          id: 2,
          eventName: "System Design Interview",
          description: "Discussion on high-level system design.",
          date: "2024-10-10",
          isCompleted: false,
      },
      {
          id: 3,
          eventName: "Behavioral Interview",
          description: "Interview with HR focusing on soft skills.",
          date: "2024-10-15",
          isCompleted: false,
      },
      {
        id: 4,
        eventName: "Behavioral Interview",
        description: "Interview with HR focusing on soft skills.",
        date: "2024-10-15",
        isCompleted: false,
    },
    {
      id: 5,
      eventName: "aditya Interview",
      description: "Interview with HR focusing on soft skills.",
      date: "2024-10-15",
      isCompleted: false,
  },
  {
    id: 6,
    eventName: "Behavioral Interview",
    description: "Interview with HR focusing on soft skills.",
    date: "2024-10-15",
    isCompleted: false,
},
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const isRecruiter = user?.unsafeMetadata?.role === 'recruiter';

  // Toggle task completion status
  const toggleTaskCompletion = (taskId) => {
      setTasks(tasks.map(task => (
          task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )));
  };

  // for rendering the video
  useEffect(() => {
    // Set a timer to hide the loading screen after 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); 

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <video
          autoPlay
          muted
          style={{ width: '100%', height: 'auto' }}
        >
          <source src="public/video.mp4" type="video/mp4" />
          Your browser is too Old Lad.
        </video>
      </div>
    );
  }

return (
  <div>
    {/* gmeet, code editor and calendar */}
    <div className='  gradient-title text-2xl font-extrabold sm:text-4xl lg:text-5xl text-center mb-12'>
      Welcome to the Interview Room, <span className='bg-gradient-to-r from-[#c96844] to-[#3b777f] bg-clip-text'>{user?.firstName}!!</span>
      <div  className='gradient-title text-xl  sm:text-2xl lg:text-3xl text-center mb-2 mt-4'>
      Hope you are doing good with {isRecruiter ? ' With your Recruitment Process' : 'With your Interviews'} !
      </div>

    </div>
    <div className='flex flex-col lg:flex-row w-full lg:justify-between items-center'>
      {/* GMeet Div */}
    <div className='rounded-md lg:w-[33%] w-full border-[3px] border-[#41767c] mb-8 lg:mb-0 mr-3' >
        <div className='bg-white dark:bg-gray-600 h-[15%] py-4'>
          <h2 className="text-xl font-extrabold mb-4 text-center">Quick Connect</h2>
        </div>
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='w-[35%] h-[31%] mx-auto lg:mx-0'>
            <img src='public/vc.png' alt='code editor' />
          </div>
          <div className='text-center text-xl font-bold mt-4 lg:mt-16 lg:mr-8'>
            One-on- One Video Call
          </div>
        </div>
        <p className='text-center'>
Excess the features of live one - on - one video call completely for free powered by V-jobs along with free and secured chat features. This also allows you to share your screen in realtime        </p>
        <div className='mt-3 ml-3 mb-3 flex flex-row justify-around'>
            <div className='mt-2'>
              <input value={value} 
              onChange={(e)=>setValue(e.target.value)}  
              type='text' 
              placeholder='Enter code given by recruiter'
              className='h-8 text-blue-700 rounded-sm border-[1px] border-[#41767c]' />
            </div>
            <div className='mt-1'>
              <Button
              variant='red'
              onClick={handlejoinRoom}>Connect
              </Button>
            </div>
        
        </div>

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
        
        <a href="https://code-editor-tan-psi.vercel.app/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="blue"
            className="text-center ml-[32%] mt-4 mb-3"
          >
            <p className="text-l">Open Live Code Editor</p>
          </Button>
      </a>

      </div>

      {/* Separator Div */}
      <div className="hidden lg:block h-[380px] bg-blue-500 w-[2px] mx-5"></div>

     

      <div className=' lg:w-[32%] w-full  '>
          <div className='border-[3px] rounded-sm border-[#41767c] h-[384px]  mx-2'>
                <div className='bg-white dark:bg-gray-600 h-[15%] py-4'>
                  <h2 className="text-xl font-extrabold mb-8 text-center">V-Jobs Interactive Whiteboard</h2>
                </div>
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='w-[40%] h-[35%] ml-2 lg:mx-2 mt-4'>
                      <img src='public/whiteboard.png' alt='whiteboard' />
                    </div>
                    <div className='text-center text-xl font-bold mt-4 lg:mt-16 lg:mr-8 mb-6'>
                      Real-Time Interactive Whiteboard
                    </div>
                </div>
                <p className='text-center mt-8 text-s sm:text-sm md:text-base lg:text-["17px"]'>
                Explore V-Jobs exclusive real-time whiteboard for communication. Explain your thoughts visually and make it more appealing.
              </p>

            
              
            <Button
              variant="blue"  onClick={() => navigate('/whiteboard')}
              className='text-center ml-[32%] mt-7 mb-3'>
              <p className='text-l'>Open Whiteboard</p>
            </Button>
          
          </div>
      </div>


    </div>

    <section>
      {/* Line */}
      <div className="hidden lg:block w-[100%] bg-blue-500 h-[2px] mt-14 mb-14"></div>

      {/* Overall div */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4  '>
         {/* Calendar Div */}
        {/* <div className='rounded-md   lg:w-[85%] w-full  border-[#c16947] mb-2 lg:mb-0 ml-6'>
          <div className="flex justify-center items-center h-[90]">
            <div className="">
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
        </div>  */}
        <div className='rounded-md   lg:w-[85%] w-full  border-[#c16947] mb-2 lg:mb-0 ml-6 mt-4'>
              <Notes/>
            </div>

        {/* Your Upcoming Events Section */}
        <div className='flex flex-col '>
          <div className='text-xl font-bold mt-4 text-center p-1 rounded-md border-[3px] border-[#41767c]'> Your Upcoming Events</div>
          <div>
            <div className='w-full lg:w-[90%] h-[380px] p-4 overflow-y-auto mt-5'>
            
                {tasks.map((task) => (
                  <div className='mb-4' key={task.id}>
                    <div className='flex items-center'>
                      <input
                        type="checkbox"
                        className="mr-4"
                        checked={task.isCompleted}
                        onChange={() => toggleTaskCompletion(task.id)}
                      />
                      <div className={`flex-grow ${task.isCompleted ? 'line-through bg-red-300 border rounded-md' : ''}`}>
                        <h4 className="text-lg font-semibold">Event Name: {task.eventName}</h4>
                        <p className="text-sm text-gray-600">Description: {task.description}</p>
                      </div>
                      <p className= {`ml-4 font-semibold text-gray-600 ${task.isCompleted ? 'line-through bg-red-300 border rounded-md' : ''}`}> Date: {task.date} </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>


      </div>
    </section>
  </div>
  
);
}

export default InterviewRoom;