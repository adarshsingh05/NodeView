import React from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import { format } from 'date-fns';

const GithubStyleHeatmap = () => {

  // Dummy data
  const values = [
    { date: '2024-01-01', count: 1 },
    { date: '2024-01-02', count: 2 },
    { date: '2024-01-03', count: 3 },
    { date: '2024-01-05', count: 4 },
    { date: '2024-01-06', count: 5 },
    // Add more data for the entire year
  ];

  return (
    <div className="overflow-x-auto p-4">
      <CalendarHeatmap
        startDate={new Date('2024-01-01')}
        endDate={new Date('2024-12-31')}
        values={values}
        classForValue={(value) => {
          if (!value) {
            return 'fill-gray-200'; // No data (empty)
          }
          if (value.count >= 1) {
            return 'fill-green-600'; // Light green for 1 count
          }
        }}
        showWeekdayLabels={false} // Disable weekday labels (Mon, Tue, etc.)
        showMonthLabels={true} // Month labels will remain
        gutterSize={1} // Adds spacing between the boxes
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': value.date ? `${format(new Date(value.date), 'yyyy-MM-dd')}: ${value.count} logins` : 'No logins',
          };
        }}
      />
      {/* Add custom margins between months */}
      <style jsx>{`
        .react-calendar-heatmap .react-calendar-heatmap-month-label {
          margin-bottom: 16px; /* Add margin between month labels and heatmap */
          font-size: 8px;
        }
        .react-calendar-heatmap .react-calendar-heatmap-day {
          margin-right: 6px; /* Add small margin between the days */
          margin-bottom: 2px;
          
        }
      `}</style>
    </div>
  );
};

export default GithubStyleHeatmap;
