import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button';
import { SignedIn, SignIn } from '@clerk/clerk-react';
import { SignInButton } from '@clerk/clerk-react';
import {UserButton } from '@clerk/clerk-react';
import { SignedOut } from '@clerk/clerk-react';
import { PenBox } from 'lucide-react';
const Header = () => {
// creating a state to handle buttons and over lay
 const [showSignIn, setShowSignIn]=useState(false);
//function to handle overlay click
  const handleOverlayClick=(e)=>{
    if(e.target===e.currentTarget){
      setShowSignIn(false);
    }
  }



  return (
  <>
    <nav className='py-4 flex justify-between items-center'>
      <Link>
      <img src='/logo.png' className='h-20'></img>
      </Link>
      
    {/* handling the user authentication and the styling */}

    <div className='flex gap-8'>
      <SignedOut>
      <Button variant="outline" onClick={()=>setShowSignIn(true)}>Login</Button>
      </SignedOut>
      <SignedIn>
{/* show this button only when the user is recruiter so add a condition */}

        <Link to="/post-jobs">
        <Button variant="red" className='rounded-full'> 
          {/* adding a logo */}
          <PenBox size={20} className='mr-2'></PenBox>
          Post a Job</Button>
        </Link>
        <UserButton />
      </SignedIn>

    </div>
    </nav>

    {/* using the state whenevr user login redirect to the onboarding screen */}
    {showSignIn && (
      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      /* adding a function so that whenver we click outside the div it should dissapear */
      onClick={handleOverlayClick}
      >
      <SignIn
      signUpForceRedirectUrl='/onboarding'
      fallbackRedirectUrl='/onboarding'
      
      />
      </div>
    )}
   </>
  )
}

export default Header;
