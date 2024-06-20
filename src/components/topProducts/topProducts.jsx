import React from 'react';

const items = ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4', 'Produto 5', 'Produto 6'];

function TopProducts() {
    return (
        <div className='p-4 w-72 h-96 rounded-lg hover:drop-shadow-sm bg-blue-900'>
            <div className="w-full h-full bg-blue-900 hover:bg-blue-700 rounded-lg overflow-hidden hover:shadow-lg shadow-white ease-in-out duration-300">
                <div className="p-4 text-center text-white">
                    <h1 className="font-bold text-xl">Mais Vendidos</h1>
                </div>
                <div className="flex flex-col items-center bg-white h-full overflow-y-auto overflow-x-hidden rounded-b-lg">
                    {items.map((item, index) => (
                        <div key={index} className="m-2 p-4 text-center hover:bg-slate-400 transition-all w-full rounded-lg group">
                            <h2 className="font-bold text-black">{item}</h2>
                            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded invisible group-hover:visible">
                                Saiba Mais
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopProducts;