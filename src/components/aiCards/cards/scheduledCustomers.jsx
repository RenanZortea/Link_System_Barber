import React, { useEffect, useState } from 'react';
import '../index.css';
import Graph from '../graph';

const cardContent = {
  title: "Clientes Agendados",
  data: [100, 105, 98, 123, 123],
};

// Check if data has at least 5 elements
if (cardContent.data.length >= 5) {
  // Get the last 5 elements
  const lastFive = cardContent.data.slice(-5);

  // Calculate the mean
  const mean = Math.round(lastFive.reduce((a, b) => a + b, 0) / lastFive.length);

  // Assign the mean to the info property
  cardContent.info = `${mean}`;
} else {
  cardContent.info = "Sem Dados o Suficiente";
}

// Check the last two elements of the data array
if (cardContent.data[cardContent.data.length - 1] < cardContent.data[cardContent.data.length - 2]) {
  cardContent.status = "down";
} else {
  cardContent.status = "up";
}

const ScheduledCustomers = () => {
  const [showGraph, setShowGraph] = useState(false);
  const title = cardContent.title;
  const info = cardContent.info;
  const status = cardContent.status;
  const data = cardContent.data;


  return (
    <>
      {showGraph && 
        <Graph title={title} status={status} info={info} data={data} />
      }
    <div
      onMouseEnter={() => setShowGraph(true)}
      onMouseLeave={() => setShowGraph(false)}
      className="flex flex-col bg-white/20 backdrop-blur-sm dark:bg-slate-800/20 shadow-md rounded-lg p-4 card group hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 hover:skew-x-1 duration-400 transition ease-in-out"
    >
      <div className="flex-row flex items-center justify-between w-full">
        <h2 className="relative text-lg font-semibold text-black dark:text-slate-200">{title}</h2>
        {status === 'up' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green" className="h-8 w-8 icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        ) : status === 'down' ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red" className="h-8 w-8 icon">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : null}
      </div>
      <p className="text-xl font-bold text-black dark:text-slate-200">{info}</p>
    </div>
    </>
  );
};

export default ScheduledCustomers;