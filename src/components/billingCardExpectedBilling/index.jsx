import React, { useEffect, useState, useContext } from 'react';
import '../aiCards/index.css';
import ExpectedBillingDataContext from '../../contexts/expectedBilling';

const BillingCardExpectedBilling = () => {
  const cardContent  = useContext(ExpectedBillingDataContext);
  const title = cardContent.title;
  const info = cardContent.info;
  const status = cardContent.status;

  return (
    <>
    <div
      className="flex flex-col bg-white/10 backdrop-blur-sm dark:bg-slate-800/20 rounded-t-lg p-4 card group"
    >
      <div className=" flex-row flex items-center justify-between w-full">
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
      <p className="text-xl font-bold text-black dark:text-slate-200">R$ {info}</p>
    </div>
    </>
  );
};

export default BillingCardExpectedBilling;