import BarDashboard from "../../components/barDashboard/barDashboard";
import LineGraph from "../../components/lineGraph";
import BarGraph from "../../components/barDashboard/barDashboard";
import PieActiveArc from "../../components/pieChart";
import './index.css';
import BillingTable from '../../components/billingTable';
import AiCards from '../../components/aiCards/AiCards';
import ExpectedBilling from "../../components/aiCards/cards/expectedBilling";
import ExpectedCustomers from "../../components/aiCards/cards/expectedCustomers";
import ScheduledCustomers from "../../components/aiCards/cards/scheduledCustomers";
import NoShowAverage from "../../components/aiCards/cards/noShowAverage";
import BillingLineGraphExpectedBilling from "../../components/billingLineGraphExpectedBilling";
import ExpectedBillingDataContext from "../../contexts/expectedBilling";
import cardContent from "../../helpers/expectedBillingMath";
import BillingCardExpectedBilling from "../../components/billingCardExpectedBilling";
import Dashboard from "../../components/circularDashboard/dashboard";




export const Billing = () => {

  const data = cardContent.data;
  const title = cardContent.title;

  return (
    <div className="flex justify-center items-center w-full h-screen overflow-hidden">
    <div className="grid grid-cols-3 gap-4 justify-center items-center h-screen overflow-hidden w-4/5">
      <div className="col-span-3 flex flex-col p-4 justify-center items-center w-full">
      </div>
        <div className="col-span-1 flex flex-col p-4 justify-center items-center w-full h-full">
          <div className="w-full bg-white/50 dark:bg-slate-700/20 backdrop-blur-lg rounded-xl shadow-md mb-7">
          <h1 className="font-bold text-black dark:text-slate-200 text-2xl antialiased justify-start flex ml-4 p-4">Faturamento</h1>
            <BarDashboard />
          </div>
          <div className="w-full bg-white/50 dark:bg-slate-700/20 backdrop-blur-lg rounded-xl shadow-md">
          <ExpectedBillingDataContext.Provider value={cardContent}>
              <BillingCardExpectedBilling />
              <div className="flex">
              <BillingLineGraphExpectedBilling data={data} title={title}/>
              </div>
            </ExpectedBillingDataContext.Provider>
          </div>
        </div>

        <div className="col-span-2 p-4 flex flex-col justify-center items-center gap-4">
          <div className="bg-white/50 w-full dark:bg-slate-700/20 backdrop-blur-lg rounded-xl shadow-md mb-4">
          <h1 className="font-bold text-black dark:text-slate-200 text-2xl antialiased justify-start flex ml-4 p-4">Clientes</h1>
            <LineGraph />
          </div>
          <div className="bg-white/50 w-full dark:bg-slate-700/20 backdrop-blur-lg rounded-xl shadow-md">
          <h1 className="font-bold text-black dark:text-slate-200 text-2xl antialiased justify-start flex ml-4 p-4">Desempenho</h1>
          <Dashboard /> 
          </div>
        </div>
    </div>
  </div>
  );
};