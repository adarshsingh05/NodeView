import Header from "@/components/header";
import { Outlet } from "react-router-dom";
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
      <div className="p-10 text-center bg-gray-800 mt-10"> Made With Love By Adarsh Singh</div>
      </div>
  );
};

export default AppLayout;
