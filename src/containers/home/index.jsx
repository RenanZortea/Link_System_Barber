import React from 'react';
import Greeting from '../../components/greeting/greeting';
import CalendarScheduler from '../../components/calendar/calendar';
import TopProducts from '../../components/topProducts/topProducts';
import Dashboard from '../../components/circularDashboard/dashboard';
import AiCards from '../../components/aiCards/AiCards';
import LineGraph from '../../components/lineGraph';
import BarDashboard from '../../components/barDashboard/barDashboard';

const Home = () => {
  return (
    <div className='home-container relative flex flex-col items-start p-7 h-screen overflow-auto'>
      <div className='greeting text-2xl font-bold p-10 rounded-8 text-center mb-20 md:mb-0'>
        <Greeting />
      </div>
      <div className='grid grid-cols-2 gap-4 w-full'>
        <div className='justify-center w-full h-4/5 overflow-x-hidden rounded-lg'>
          <CalendarScheduler />
        </div>
        <div className='w-full p-4'>
          <AiCards />
        </div>
      </div>
    </div>
  );
}

export default Home;