import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

export function MenubarDemo() {
    return (
        <div className="h-16 w-[780px]"> {/* Set height here */}
        <Menubar className="h-full w-full lg:flex hidden  justify-between">

            <MenubarMenu>
            <Link to="/">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Home Page
                </MenubarTrigger>
            </Link>
            </MenubarMenu>
            <MenubarMenu>
             <Link to="/userpage">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    User Profile
                </MenubarTrigger>
                
            </Link>
            </MenubarMenu>
            

            <MenubarMenu>
            <Link to="/interviewroom">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Interview Room
                </MenubarTrigger>
            </Link>
            </MenubarMenu>

            <MenubarMenu>
            <Link to="/chats">
                <MenubarTrigger className="font-bold h-full flex items-center cursor-pointer">
                    Chats
                </MenubarTrigger>
            </Link>
            </MenubarMenu>
            </Menubar>
        </div>
    );
}
