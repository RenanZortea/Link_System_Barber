import React, { useCallback, useEffect, useState } from 'react'
import { fetchBillingData } from '../../contexts/billingData'

export default function BillingTable() {
const [data, setData] = useState([]);
const [period, setPeriod] = useState('daily'); // default to 'daily'

const fetchData = useCallback(async () => {
  const fetchedData  = await fetchBillingData();
  if (fetchedData && Array.isArray(fetchedData.billingActualData) && Array.isArray(fetchedData.profitData) && Array.isArray(fetchedData.dateData)) {
    const newData = fetchedData.billingActualData.map((item, index) => {
      // Convert Firestore timestamp to JavaScript Date
      const date = fetchedData.dateData[index].toDate();
      // Format the date as a string
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

      return {
        billingActual: item,
        profit: fetchedData.profitData[index],
        date: formattedDate
      };
    });

    setData(newData);
  } else {
    console.error('fetchedData does not contain the expected arrays:', fetchedData);
  }
}, []);

useEffect(()  => {
  fetchData();
}, [fetchData]);

  return (
<div className='flex flex-col'>
  <div className='relative flex justify-end'>
    <div className='relative w-1/12 p-4 mr-10 mt-10 bg-slate-400 rounded-xl'>
    <button
  className='absolute text-sm top-0 right-0 m-2 text-white font-bold rounded z-99'
  onClick={() => setPeriod('daily')}>Daily</button>
<button
  className='absolute text-sm top-0 left-0 m-2 text-white font-bold rounded z-98'
  onClick={() => setPeriod('monthly')}>Monthly</button>
    </div>
  </div>
<ul role="list" className="divide-y divide-gray-100 p-5 overflow-x-auto">
    <li className="flex justify-between gap-x-6 p-5 bg-slate-300 dark:bg-slate-700 rounded-lg">
      <div className="flex min-w-0 gap-x-4">
        <div className="p-2">
          <p className="text-sm font-semibold leading-6 text-slate-800 dark:text-slate-200">Faturamento</p>
        </div>
        <div className="p-2">
          <p className="text-sm leading-6 text-slate-800 dark:text-slate-200">Lucro</p>
        </div>
      </div>
    </li>
    {period === 'daily' && Array.isArray(data) && data.map((item, index) => (
  <li
    key={`${item.billingActual}-${index}`}
    className="flex justify-between gap-x-6 p-5 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg hover:translate-y-2 transition ease-in-out cursor-pointer"
  >
    <div className="flex min-w-0 gap-x-4">
      <div className="bg-gray-50 p-2 rounded-md">
        <p className="text-sm font-semibold leading-6 text-gray-900">R$ {item.billingActual}</p>
      </div>
      <div className="bg-gray-50 p-2 rounded-md ml-4">
        <p className="text-sm leading-6 text-gray-900">R$ {item.profit}</p>
      </div>
    </div>
    <div>
    <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">Date: {item.date}</p>
    </div>
    <div className="flex items-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </button>
    </div>
  </li>
))}
  </ul>
  {/* {period === 'monthly' data.monthlyData.map((item, index) => (
    <li
      key={`${item}-${index}`}
      className="flex justify-between gap-x-6 p-5 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-lg hover:translate-y-2 transition ease-in-out cursor-pointer"
    >
      <div>
        <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-slate-200">R$ {item}</p>
      </div>
      <div>
        <p className="text-sm leading-6 text-gray-500 dark:text-bold">R$ {data.profitData[index]}</p>
      </div>
    </li>
  ))} */}
</div>
  );
}