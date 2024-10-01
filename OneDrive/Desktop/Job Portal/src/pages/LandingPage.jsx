import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { CarouselContent } from "@/components/ui/carousel";
import { CarouselItem } from "@/components/ui/carousel";
import companies from '../data/companies.json'
import faqs from '../data/faqs.json'

import Autoplay from "embla-carousel-autoplay";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useUser } from "@clerk/clerk-react";

import { Card,CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const LandingPage = () => {
  const{user}=useUser();
  return (
    <main className='flex flex-col gap-10 sm:gap-20 '>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-3xl font-extrabold sm:text-5xl lg:text-7xl 
        tracking-tighter py-4'>
          Find Opportunities, showcase your skills {' '}
         {/* making the image side by side */}
          <span className="flex items-center gap-2 sm:gap-6 ">
            and Get{" "}
             <img
              src="/logo.png" 
              alt='hired' 
              className='h-14 sm:h-24 lg:h-32'
             />
          </span>
        </h1>
        <p className="text-grey-300 sm:mt-4 text-xs sm:text-xl">
        Explore thousands of job listings or find the perfect candidate        </p>
      </section>
      <div className="flex gap-6 justify-center" >
        {/* button and linking to respective place-routing */}
        <Link to='/jobs'>
        {/* adding th custom defined class into the button as variant */}
        <Button variant='blue' size="xl">Find Jobs</Button>
        </Link>

        <Link to='/post-jobs'>
        <Button variant="red" size="xl"
        disabled={user?.unsafeMetadata?.role === "candidate"}>
          Post Jobs</Button>
        </Link>
 
      </div>
      {/* to add things into curousel we need to prepare the json data find it in src-data-companies.json */}
      {/* curousel code from shadcn ui */}
      <Carousel
      // providing the autoplay as a plugin
      plugins={[
        Autoplay({delay:1000})
      ]}
      className="w-full mpy-10">
      
      <CarouselContent className="flex gap-5 sm:gap-20 items-center">
        {/* writing own carousel */}

      {companies.map(({name,id,path})=>{
        return( 
          // defining how many carousel i want according to screen in the classname
        <CarouselItem key={id} className='basis-1/3 lg:basis-1/6'>
          <img src={path}
          alt={name}
          className="h-9 sm:h-14 object-contain"/>
        </CarouselItem>
        );
      })}
      
      </CarouselContent>
    </Carousel>

      {/* banner */}
      <section>
        <div className="text-center text-2xl sm:text-3xl font-bold mt-4 mb-2 "> Explore V-jobs' Exclusive Features</div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* cards */}
        {/* card 01 */}
        <Card>
          <CardHeader>
          <div className="flex items-center space-x-2 ">
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6 text-gray-500"
          
        >
          
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
          />
        </svg>
        <CardTitle className="mr-3">Map View</CardTitle>
      </div>
      <CardDescription>Our own code editor with multi Language-Support</CardDescription>
    </CardHeader>
    <CardContent>
      <p>
        Use Hirred Own code editor to run and test your code for your interviews with all new AI Based plagiarism Detector
      </p>
    </CardContent>
  </Card>

        {/* card 02*/}
        <Card>
          <CardHeader>
            <CardTitle>Resume Test</CardTitle>
            <CardDescription>Verify Your Resume with our AI based analysis</CardDescription>
          </CardHeader>
            <CardContent>
              <p>Get Your resume verified Get missing Keywords and Suggestions based on the Project Description</p>
            </CardContent> 
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-0">
        {/* cards */}
        {/* card 01 */}
        <Card>
          <CardHeader>
            <CardTitle>Interview Room</CardTitle>
            <CardDescription>Get Our all new personalised Interview Room</CardDescription>
          </CardHeader>
            <CardContent>
              <p>Get features like inbuilt code editor video call feature and a lot more</p>
            </CardContent> 
        </Card>

        {/* card 02*/}
        <Card>
          <CardHeader>
            <CardTitle>Feature four</CardTitle>
            <CardDescription>Feature 4</CardDescription>
          </CardHeader>
            <CardContent>
              <p>Feature 4</p>
            </CardContent> 
        </Card>
      </section>

      <h2 className="text-2xl sm:text-3xl font-bold text-center mt-4 mb-2">Frequently Asked Questions</h2>

      {/* accordians for Faqs getting from the json*/}
      <Accordion type="single" collapsible>
        {faqs.map((faq,index)=>{
          return (
            <AccordionItem key={index} value={`item-${index+1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
          )
        })}
      </Accordion>

  



    </main>
  )
};

export default LandingPage