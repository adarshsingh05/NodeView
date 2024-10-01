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
      {/* <div className="p-10 text-center bg-gray-800 mt-10"> Made With Love By Adarsh Singh</div> */}

      <div className="bg-gray-800 mt-14 flex flex-col md:flex-row justify-between p-6 text-white">
  
  {/* About Us Section */}
  <div className="mb-6 md:mb-0 w-13">
    <h2 className="text-lg font-bold mb-2">About V-jobs</h2>
    <p className="text-m">
      
    </p>
  </div>

  {/* Quick Links */}
  <div className="mb-6 md:mb-0">
    <h2 className="text-lg font-bold mb-2">Quick Links</h2>
    <ul className="text-sm">
      <li className="mb-1 hover:underline cursor-pointer">Home</li>
      <li className="mb-1 hover:underline cursor-pointer">Job Listings</li>
      <li className="mb-1 hover:underline cursor-pointer">Post a Job</li>
      <li className="mb-1 hover:underline cursor-pointer">About Us</li>
      <li className="mb-1 hover:underline cursor-pointer">Contact Us</li>
    </ul>
  </div>

  {/* Resources */}
  <div className="mb-6 md:mb-0">
    <h2 className="text-lg font-bold mb-2">Resources</h2>
    <ul className="text-sm">
      <li className="mb-1 hover:underline cursor-pointer">Career Tips</li>
      <li className="mb-1 hover:underline cursor-pointer">Resume Guide</li>
      <li className="mb-1 hover:underline cursor-pointer">Interview Tips</li>
      <li className="mb-1 hover:underline cursor-pointer">For Startups</li>
    </ul>
  </div>

  {/* Contact Information */}
  <div className="mb-6 md:mb-0">
    <h2 className="text-lg font-bold mb-2">Contact Us</h2>
    <p className="text-sm">
      Email: Comming Soon <br />
      Phone: Comming Soon
    </p>

    {/* Social Media Links */}
    <div className="flex space-x-10 mt-4">
      <a href="#" className="hover:opacity-75 h-9 w-9"><img src="https://cdn.techgyd.com/50-Best-Facebook-Logo-Icons-GIF-Transparent-PNG-Images-28.png" alt="Facebook" /></a>
      <a href="#" className="hover:opacity-75 h-9 w-9"><img src="https://cdn3.iconfinder.com/data/icons/social-icons-5/606/LinkedIn.png" alt="LinkedIn" /></a>
    </div>
  </div>
  
  {/* Footer Bottom Section */}
  <div className="mt-6 md:mt-5 text-center">
    <p className="text-m">© 2024 V-jobs. All Rights Reserved.</p>
    <div className="text-s mt-2">
      <a href="#" className="hover:underline mr-4">Terms of Service</a>
      <a href="#" className="hover:underline">Privacy Policy</a>
    </div>
  </div>

</div>

      {/* <div className="bg-gray-800 mt-10 flex flex-row justify-between"> 
      
      
      </div> */}
      </div> 
  );
};

export default AppLayout;
