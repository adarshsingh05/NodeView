import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


// Helper function to truncate text to the first 80 words
const truncateReview = (review, wordLimit = 35) => {
  const words = review.split(" ");
  return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : review;
};

// Sample reviews array
const reviews = [
  {
    name: "Alice Johnson",
    review: "This platform has greatly improved my job search experience! The user interface is intuitive and easy to navigate. I was able to filter job listings based on my preferences, which saved me a lot of time. The variety of job postings available is impressive, covering various industries and roles. I highly recommend this platform to anyone looking for their next opportunity. I also appreciate the resources available for resume building and interview preparation.",
    rating: 5,
  },
  {
    name: "Bob Smith",
    review: "A fantastic resource for both job seekers and recruiters. As a recruiter, I find it easy to post job openings and receive qualified applicants. The platform allows me to connect with candidates efficiently, streamlining the hiring process. On the other hand, job seekers can find numerous opportunities tailored to their skills and experience. I have had success finding great candidates and have also referred several friends who were looking for jobs to use this platform.",
    rating: 4,
  },
  {
    name: "Cathy Brown",
    review: "Very user-friendly and effective. I found my dream job here within a few weeks of actively applying. The platform provides helpful tips and resources for optimizing my resume, which made a significant difference. I also appreciate the notification feature that alerts me to new job postings that match my criteria. The community support is fantastic, and I felt encouraged throughout my job search journey. I can’t thank this platform enough for its assistance in landing my ideal job!",
    rating: 5,
  },
  {
    name: "David Wilson",
    review: "Great platform, but could use more job postings in my area. I appreciate the ease of navigation and the variety of filters available for job searching. The application process is straightforward, which makes applying for multiple jobs less daunting. I found several jobs that piqued my interest, but I would love to see more options available in my specific location. Overall, I believe this platform is a valuable tool for job seekers looking for new opportunities.",
    rating: 3,
  },
  {
    name: "Emma White",
    review: "The interface is intuitive, and I love the job matching feature. After setting up my profile, I received job recommendations that perfectly aligned with my skills and interests. This personalized approach made the job search feel less overwhelming. Additionally, the resources available for interview preparation are top-notch, offering practical tips and strategies. I have shared this platform with friends and colleagues because I genuinely believe it can help anyone looking to advance their career. I’m very satisfied with my experience!",
    rating: 4,
  },
];

export function CarouselSize() {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-5xl" // This ensures the carousel takes up to the max width of 5xl
      >
        <CarouselContent className="flex">
          {reviews.map((review, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex items-center justify-center px-4"
            >
              <div>
                <Card className="w-80 h-70 flex items-center justify-center">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="font-bold">{review.name}</h3>
                    <p className="mt-2">{truncateReview(review.review)}</p>
                    <p className="mt-2 font-semibold">Rating: {review.rating}⭐</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
