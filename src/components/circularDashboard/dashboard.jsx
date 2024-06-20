import React from 'react';
import CircularGraphWidget from './circularGraphWidget';
import './dashboard.css';

const Dashboard = () => {
  const data = [
    { title: 'Renan', percentage: 86 },
    { title: 'Samuel', percentage: 89 },
    { title: 'Gabriel', percentage: 78 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard text-xl font-bold font-sans antialiased">
        <div className="widgets">
          {data.map((item, index) => (
            <CircularGraphWidget
              key={index}
              title={item.title}
              percentage={item.percentage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
