import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import React from "react";
import PieChart from "@/components/PieChart";
import LinkedInShareButton from "@/components/LinkedInShareButton";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"; // Updated import

const DashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const skills = [
    { name: 'Graphic Design', rating: 4 },
    { name: 'Web Development', rating: 4 },
    { name: 'Copywriting', rating: 3.0 },
  ];

  const applicationStats = {
    submitted: 15,
    interviews: 5,
    interviewCleared: 2,
    offers: 2,
  };

  const data = [
    applicationStats.submitted,
    applicationStats.interviews,
    applicationStats.interviewCleared,
    applicationStats.offers,
  ];

  // Dummy recruiter reviews data
  const reviews = [
    { reviewer: 'John Doe', comment: 'Very strong candidate with great skills!' },
    { reviewer: 'Jane Smith', comment: 'Impressive work ethic and communication skills.' },
    { reviewer: 'Recruiter X', comment: 'Would recommend for future projects.' },
    { reviewer: 'Recruiter Y', comment: 'Excellent coding ability, needs to work on time management.' },
  ];

  return (
    <main className="flex flex-col gap-8 p-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-white">Welcome, {user?.firstName} !!</h1>
        <p className="text-gray-400 mt-2">Manage your job applications and portfolio</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {/* Job Applications Card */}
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
            <CardDescription>View and manage your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="blue" onClick={() => handleNavigate('/my-jobs')}>My Jobs</Button>
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Update your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="blue" onClick={() => navigate('/userpage')}>My Profile</Button>
          </CardContent>
        </Card>

        {/* Saved Jobs */}
        <Card className="bg-gray-800 text-white">
          <CardHeader>
            <CardTitle>Saved Jobs</CardTitle>
            <CardDescription>View your saved job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="blue" onClick={() => handleNavigate('/saved-jobs')}>View Saved Jobs</Button>
          </CardContent>
        </Card>
      </section>

      {/* Stats and Chart Section */}
      <section className="flex flex-row gap-10 h-auto w-auto max-h-[240px]">
        {/* Applications Stats Card */}
        <section className="bg-gray-800 text-white w-[35%] flex-grow">
          <Card className="h-[100%]">
            <CardHeader>
              <CardTitle className="text-center">Application Stats</CardTitle>
              <CardDescription className="text-center">Track your application progress</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-center">Applications Submitted: {applicationStats.submitted}</p>
              <p className="text-lg text-center">Total No of Interviews: {applicationStats.interviews}</p>
              <p className="text-lg text-center">No of Interviews Cleared: {applicationStats.interviewCleared}</p>
              <p className="text-lg text-center">No of Job Offers received: {applicationStats.offers}</p>
            </CardContent>
          </Card>
        </section>

        {/* Pie Chart */}
        <section className="w-[40%]">
          <PieChart className="w-[100%]" data={data} />
        </section>
      </section>

      {/* Rating Per Skill and Recruiter Reviews Section */}
      <section className="flex flex-col md:flex-row gap-8 w-[100%] ">
        {/* Rating Per Skill Section */}
        <section className="w-full md:w-[50%]">
          <Card className="bg-gray-800 text-white h-[300px] overflow-y-scroll border border-white rounded-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Rating Per Skill</CardTitle>
              <CardDescription className="text-gray-400 p-2 border-b border-gray-600">View your skill ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-bold">Skill</div>
                <div className="font-bold text-right">Rating</div>
                {skills.map((skill, index) => (
                  <React.Fragment key={index}>
                    <div className="p-2">{skill.name}</div>
                    <div className="p-2 flex justify-end items-center">
                      {Array.from({ length: 5 }, (_, i) => {
                        if (i < Math.floor(skill.rating)) {
                          return <span key={i} className="text-purple-500">★</span>;
                        } else if (i === Math.floor(skill.rating) && skill.rating % 1 !== 0) {
                          return <span key={i} className="text-purple-500">★</span>;
                        } else {
                          return <span key={i} className="text-gray-400">★</span>;
                        }
                      })} ({skill.rating})
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
            <div className="flex justify-between items-center p-4">
              <LinkedInShareButton 
                url="http://localhost:5173/dashboard"  // The URL to the dashboard page you want to share
              />
              <Button className="flex items-center" variant="blue">
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                Download Report
              </Button>
            </div>
          </Card>
        </section>

        {/* Recruiter Reviews Section */}
        <section className="w-full md:w-[50%] sticky top-20">
          <Card className="bg-gray-800 text-white h-[300px] overflow-y-scroll border-white rounded-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sticky">Recruiter Reviews</CardTitle>
              <CardDescription className="text-gray-400">What recruiters say about you</CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.map((review, index) => (
                <div key={index} className="p-2 border-b border-gray-600">
                  <p className="text-lg font-semibold">{review.reviewer}</p>
                  <p className="text-gray-300">{review.comment}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
};

export default DashboardPage;
