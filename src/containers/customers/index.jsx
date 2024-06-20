import React, { useContext, useState } from "react";
import CustomersList from "../../components/customersList";
import AddCustomerButton from "../../components/customersList/addCustomerButton";

export default function Customers() {

  return (
    <div className="h-screen overflow-auto w-full">
        <div className="flex justify-center items-center h-screen overflow-hidden w-full">
          <div className=" bg-white/30 dark:bg-slate-700/40 backdrop-blur-lg rounded-lg shadow-md h-4/5 w-11/12">
          <h1 className="text-black dark:text-slate-100 text-3xl font-bold mb-10">Clientes</h1>
            <div className="mb-4 h-full">
                <CustomersList />
                <div className="fixed">
                  <AddCustomerButton />
                </div>
            </div>
            <div className="place-content-center mx-auto w-full">
              
            </div>
          </div>
        </div>
    </div>
  );
}