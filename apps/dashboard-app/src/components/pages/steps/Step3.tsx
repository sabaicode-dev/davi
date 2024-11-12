// src/components/Step3.tsx
import React from "react";
import CSV from "@/public/images/step/CSV_logo.png";
import Mongo from "@/public/images/step/MongoDB_logo.png";
import URL from "@/public/images/step/URL_logo.png";
import MySql from "@/public/images/step/MySQL_logo.png";
import Button from "@/src/components/atoms/Button";

interface Step3Props {
  onNext: () => void;
  onBack?: () => void;
  onSelectSource: (source: string) => void;
}

const Step3: React.FC<Step3Props> = ({ onBack, onSelectSource }) => {
  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Pick a data source to start
      </h2>

      <div className="mx-auto flex flex-row justify-between items-center space-x-6">
        {" "}
        {/* Reduced spacing here */}
        <div
          onClick={() => onSelectSource("CSV")}
          className="w-60 h-full mx-auto border rounded-lg" // Reduced width from w-72 to w-60
        >
          <div className="bg-green-100 cursor-pointer hover:bg-green-200 h-32 px-6 py-3 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
            {" "}
            {/* Reduced height and padding */}
            <img src={CSV} alt="CSV Icon" className="w-16" />{" "}
            {/* Reduced image size */}
          </div>
          <div className="flex justify-between items-center p-1">
            {" "}
            {/* Reduced padding */}
            <p className="text-gray-800 text-sm">Upload File</p>{" "}
            {/* Made font size smaller */}
            <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 px-1 py-0.5">
              CSV
            </button>
          </div>
        </div>
        <div
          onClick={() => onSelectSource("URL")}
          className="w-60 h-full mx-auto border rounded-lg"
        >
          <div className="bg-[#93B9FB] cursor-pointer hover:bg-blue-200 h-32 px-6 py-3 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
            <img src={URL} alt="URL Icon" className="w-16" />
          </div>
          <div className="flex justify-between items-center p-1">
            <p className="text-gray-800 text-sm">From Web</p>
            <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 px-1 py-0.5">
              import only
            </button>
          </div>
        </div>
        <div
          onClick={() => onSelectSource("MySQL")}
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
        <div
          onClick={() => onSelectSource("MongoDB")}
          className="w-60 h-full mx-auto border rounded-lg"
        >
          <div className="bg-[#DCFAEA] cursor-pointer hover:bg-green-200 h-32 px-6 py-3 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
            <img src={Mongo} alt="MongoDB Icon" className="w-16" />
          </div>
          <div className="flex justify-between items-center p-1">
            <p className="text-gray-800 text-sm">MongoDB</p>
            <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 px-1 py-0.5">
              import only
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center h-auto mt-36">
        {" "}
        {/* Adjusted spacing */}
        <div className="bg-white p-6 max-w-xl w-full text-center">
          {" "}
          {/* Reduced padding and width */}
          <div className="flex justify-center mt-4 mb-2">
            <div className="h-1 w-6 bg-blue-600 rounded-full mx-1"></div>{" "}
            {/* Reduced width */}
            <div className="h-1 w-6 bg-blue-600 rounded-full mx-1"></div>
            <div className="h-1 w-6 bg-blue-200 rounded-full mx-1"></div>
          </div>
        </div>
        
      </div>
      {/* Adjusted spacing */}
      <div className="flex justify-end items-end w-full">
          <Button
            onClick={onBack}
            children="Back"
            size="medium"
            radius="2xl"
            color="outline"
            isLoading={false}
            isIconOnly={false}
            isDisabled={false}
          />
        </div>
    </div>
  );
};

export default Step3;
