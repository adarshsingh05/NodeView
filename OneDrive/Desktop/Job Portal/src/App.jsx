import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'

// map


import AppLayout from './layout/AppLayout';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/onboarding';
import SavedJobs from './pages/saved-jobs';
import MyJobs from './pages/my-jobs';
import JobListing from './pages/job-listing';
import Jobs from './pages/jobs';
import PostJobs from './pages/post-jobs';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoutes from './components/protected-routes';
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
