import Header from "@/components/header";
import { Link, Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      {/* putting all the routes in main */}
      <main className="min-h-screen container">
        <Header/>
        <Outlet />  
      </main>  

      {/* creating a footer */}
   <div className="flex">
    <div className="bg-gray-800 height-[auto] w-[100%] m-6 border rounded-md">
      <div className="bg-[#020817] flex flex-row h-[40%] justify-around mt-3 mb-2 ml-4 mr-4 border rounded-md">
        <div className="font-extrabold">
          Contact us
        </div>
        <div className="font-extrabold">
          Contribute
        </div>
        <Link to="/write-feedback">
          <div className="font-extrabold cursor-pointer">
            Give Feedback
          </div>
        </Link>

      </div>
      <div className="text-center mb-4"> The site is currently in Development Mode, contribute to make it even better ❤️</div>
    </div>
   </div>

      {/* <div className="bg-gray-800 mt-10 flex flex-row justify-between"> 
      
      
      </div> */}
      </div> 
  );
};

export default AppLayout;
