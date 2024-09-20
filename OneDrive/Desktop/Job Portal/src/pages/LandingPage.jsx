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

import { Card,CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-3xl font-extrabold sm:text-5xl lg:text-7xl 
        tracking-tighter py-4'>
          Find projects, showcase your skills {' '}
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
          Explore a Tons of Project Listings or Find a perfect Candidate for your project
        </p>
      </section>
      <div className="flex gap-6 justify-center" >
        {/* button and linking to respective place-routing */}
        <Link to='/jobs'>
        {/* adding th custom defined class into the button as variant */}
        <Button variant='blue' size="xl">Find Projects</Button>
        </Link>

        <Link to='/post-jobs'>
        <Button variant="red" size="xl">Post Projects</Button>
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
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* cards */}
        {/* card 01 */}
        <Card>
          <CardHeader>
            <CardTitle>Map View</CardTitle>
            <CardDescription>Get Our Latest Map-Based Freelancing Features</CardDescription>
          </CardHeader>
            <CardContent>
              <p>Search and get Projects Nearby You based on the new Map based selection Process</p>
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
