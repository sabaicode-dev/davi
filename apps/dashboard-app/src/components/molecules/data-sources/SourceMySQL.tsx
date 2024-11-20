import React from 'react'
import MySql from "@/public/images/step/MySQL_logo.png";

const SourceMySQL:React.FC = () => {
  return (
    <div
    className="w-60 h-full mx-auto border rounded-lg"
  >
    <div className="bg-[#BED5FD] cursor-pointer hover:bg-blue-200 h-32 px-6 py-3 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
      <img src={MySql} alt="MySQL Icon" className="w-16" />
    </div>
    <div className="flex justify-between items-center p-1">
      <p className="text-gray-800 text-sm">MySQL</p>
      <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 px-1 py-0.5">
        import only
      </button>
    </div>
  </div>

  )
}

export default SourceMySQL
