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
        element: <Onboarding/>
      },
      {
        path:'/saved-jobs',  
        element: <SavedJobs/>
      },
      {
        path:'/job-listing',  
        element: <JobListing/>
      },
      {
        path:'/jobs',  
        element: <Jobs/>
      },
      {
      path:'/my-jobs',  
      element: <MyJobs/>
      },
      {
        path:'/post-jobs',  
        element: <PostJobs/>
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
