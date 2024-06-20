import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

function AddBillingData() {
  return (
    <div>
      <button className="bg-green-500 text-white w-12 h-12 rounded-full hover:bg-green-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
        <AiOutlinePlus />
      </button>
    </div>
  )
}

export default AddBillingData