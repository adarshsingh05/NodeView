// this file is to make user login before accessing to the pages like saved jobs or post jobs
// this will be wrapped around all the pages except the landing page
import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    // global authentication for the user given by clerk
    const {isSignedIn, user, isLoaded} =  useUser();
    const {pathname} = useLocation();
    if(isLoaded && !isSignedIn && isSignedIn!==undefined){
        return <Navigate to = "/?sign-in=true"/>;
    }

    return children;
};

export default ProtectedRoutes;
