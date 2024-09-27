import React, { useEffect, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const UserPage = () => {
  const revenueChartRef = useRef(null); // Ref for revenue chart
  const proficiencyChartRef = useRef(null); // Ref for proficiency chart

  const revenueData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Revenue',
        data: [120000, 150000, 170000, 200000, 190000, 210000, 230000],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Projects',
        data: [300, 400, 450, 500, 550, 600, 650],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  };

  const workProficiencyData = {
    labels: ['Graphic Design', 'Web Development', 'Copywriting'],
    datasets: [
      {
        label: 'Proficiency',
        data: [50, 30, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
      },
    ],
  };

  // Cleanup for revenue chart
  useEffect(() => {
    return () => {
      if (revenueChartRef.current) {
        revenueChartRef.current.destroy();
      }
    };
  }, []);

  // Cleanup for proficiency chart
  useEffect(() => {
    return () => {
      if (proficiencyChartRef.current) {
        proficiencyChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="bg-gray-900 p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold">Revenue and Projects</h2>
          <Bar ref={revenueChartRef} data={revenueData} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Work Proficiency</h2>
          <Pie ref={proficiencyChartRef} data={workProficiencyData} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
