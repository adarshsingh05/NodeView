import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

// map
import UserPage  from './pages/UserPage';
import DashboardPage from './pages/DashboardPage';
import AppLayout from './layout/AppLayout';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/onboarding';
import SavedJobs from './pages/saved-jobs';
import MyJobs from './pages/my-jobs';
import JobListing from './pages/job-listing';
import JobPage from './pages/jobs';
import PostJobs from './pages/post-jobs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoutes from './components/protected-routes';
import InterviewRoom from './pages/InterviewRoom';
import Whiteboard from './pages/Whiteboard';
import HomePage from './components/home';
import RoomPage from './components/room';
// defining the router dom and creating athe route for the multi pages app.
const router=createBrowserRouter([
  {
    element: <AppLayout/>,
    // all the routes will be inside the children pages
    children:[
      {
        path:'/',  
        element: <LandingPage/>
      },
      {
        path:'/onboarding',  
        element: (
        <ProtectedRoutes> 
          <Onboarding/>
        </ProtectedRoutes>)
        
      },
      {
        path:'/homepage',  
        element: (
        <ProtectedRoutes> 
          <HomePage/>
        </ProtectedRoutes>)
        
      },
      {
        path:'//room/:roomId',  
        element: (
        <ProtectedRoutes> 
          <RoomPage/>
        </ProtectedRoutes>)
        
      },
      {
        path:'/saved-jobs',  
        element: (
          <ProtectedRoutes> 
            <SavedJobs/>
          </ProtectedRoutes>)
      },
      {
        path:'/job-listing',  
        element: (
          <ProtectedRoutes> 
            <JobListing/>
          </ProtectedRoutes>)
      },
      {
        path:'/jobs', 
       
        element:(
          <ProtectedRoutes>  
        <JobListing/>
        </ProtectedRoutes>) 
      },
      {
        path:'/whiteboard', 
       
        element:(
          <ProtectedRoutes>  
        <Whiteboard/>
        </ProtectedRoutes>) 
      },
      {
        path:'/interviewroom', 
       
        element:(
          <ProtectedRoutes>  
        <InterviewRoom/>
        </ProtectedRoutes>) 
      },
      {
      path:'/my-jobs',  
      element: (
        <ProtectedRoutes> 
          <MyJobs/>
        </ProtectedRoutes>)
      },
      {
        path:'/post-jobs',  
        element: (
          <ProtectedRoutes> 
            <PostJobs/>
          </ProtectedRoutes>)
        },
        {
// will go to the job page newly created and fetch with some id

          path: "/job/:id",
          element :(
            <ProtectedRoutes> 
            <JobPage/>
          </ProtectedRoutes>
            
          )
        },
        {
          path: '/dashboard',  
          element: (
            <ProtectedRoutes> 
              <DashboardPage /> 
            </ProtectedRoutes>
          ),
        },
        {
          path: '/userpage',
          element: (
            <ProtectedRoutes>
              <UserPage/>
            </ProtectedRoutes>
          )
        }
    ],
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;