import React from "react";
import CalendarScheduler from '../../components/calendar/calendar';
import CalendarDatePicker from "../../components/calendarDatePicker/index";

const Scheduler = () => {
  return (
    <div className='relative flex items-center justify-end h-screen p-4'>
      <div className="relative flex items-center justify-center h-4/5 overflow-hidden w-4/5">
        <div className="bg-white/30 dark:bg-slate-700/40 backdrop-blur-sm rounded-lg shadow-md h-full w-full overflow-auto">
          <CalendarScheduler />
        </div>
      </div>
    </div>
  );
};

export default Scheduler;