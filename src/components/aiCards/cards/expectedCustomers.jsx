import React, { useEffect, useState, useContext } from 'react';
import '../index.css';
import Graph from '../graph';
import ExpectedCustomersContext from '../../../contexts/expectedCustomers';



const ExpectedCustomers = () => {
  const [showGraph, setShowGraph] = useState(false);
  const cardContentCustomersExpected = useContext(ExpectedCustomersContext);
  const cardContent = cardContentCustomersExpected;
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

export default ExpectedCustomers;