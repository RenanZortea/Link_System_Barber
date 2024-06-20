import React, { createContext, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { registerCustomer } from '../../../contexts/customerData';

function AddCustomerPopUp({ hide }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      await registerCustomer(name, phoneNumber);
      hide();
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center animate-down-up'>
            <div className='bg-white/40 dark:bg-slate-700/40 backdrop-blur-xl rounded-xl shadow-lg w-1/2 h-4/5 place-content-center mx-auto fixed'>
                <button className="text-slate-900 font-bold text-2xl hover:translate-y-2 transition ease-in-out py-2 px-4 rounded top-0 right-0 absolute" onClick={hide}><IoIosClose /></button>
                <div className='flex flex-col items-center'>
                    <h1 className='text-black dark:text-slate-200 font-bold top-0 absolute text-2xl mt-10'>Adicionar Cliente</h1>
                    <form onSubmit={handleSubmit} className='w-2/3 bg-slate-100 dark:bg-slate-700 rounded-xl shadow-xl mx-auto items-center justify-center'>
                        <div className='flex flex-col items-center'>
                            <input type="text" placeholder="Nome..." className="border-2 border-gray-300 text-black rounded-lg p-2 w-2/3 my-2" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder="Telefone..." className="border-2 border-gray-300 text-black rounded-lg p-2 w-2/3 my-2" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded-xl flex items-center hover:animate-pulse transition ease-in-out justify-center mt-10 mb-10 h-12 w-24 hover:translate-y-2">Adicionar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export const SubmitButtonPressedContext = createContext();
export default function AddCustomerButton() {
    const [showComponent, setShowComponent] = useState(false);
    
    return (
            <div>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded-full flex items-center hover:animate-pulse transition ease-in-out justify-center size-12"
                    onClick={() => setShowComponent(true)}
                >
                    <FaPlus />
                </button>
                {showComponent && <AddCustomerPopUp hide={() => setShowComponent(false)} />}
            </div>
    );
}