import React from "react";
import CSV from "@/public/images/step/CSV_logo.png";

const SourceCSV: React.FC = () => {
  return (
    <div
      className="w-60 h-full mx-auto border rounded-lg" // Reduced width from w-72 to w-60
    >
      <div className="bg-green-100 cursor-pointer hover:bg-green-200 h-32 px-6 py-3 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
        {/* Reduced height and padding */}
        <img src={CSV} alt="CSV Icon" className="w-16" />
        {/* Reduced image size */}
      </div>
      <div className="flex justify-between items-center p-1">
        {/* Reduced padding */}
        <p className="text-gray-800 text-sm">Upload File</p>
        {/* Made font size smaller */}
        <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 px-1 py-0.5">
          CSV
        </button>
      </div>
    </div>
  );
};

export default SourceCSV;
