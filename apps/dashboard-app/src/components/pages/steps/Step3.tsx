// src/components/Step3.tsx
import React from "react";
import CSV from "@/public/images/step/CSV_logo.png";
import Mongo from "@/public/images/step/MongoDB_logo.png";
import URL from "@/public/images/step/URL_logo.png";
import MySql from "@/public/images/step/MySQL_logo.png";

interface Step3Props {
  onNext: () => void;
  onBack?: () => void;
  onSelectSource: (source: string) => void; // Added for selecting a source
}

const Step3: React.FC<Step3Props> = ({ onBack, onSelectSource }) => {
  return (
    <div className="container ">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        Pick a data source to start
      </h2>

      <div className="mx-auto flex justify-between ml-28 ">
        
        <div  onClick={() => onSelectSource("CSV")} className="w-72 h-full mx-auto border rounded-lg">
          <div className="bg-green-100 cursor-pointer hover:bg-green-200 h-40 px-10 py-4 flex items-center justify-center">
            <img src={CSV} alt="CSV Icon" className="w-20 " />
          </div>
          <div className="flex justify-between items-center p-2">
            <p className="text-gray-800 ">Upload File</p>
            <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 p-1">
              CSV
            </button>
          </div>
        </div>
        <div className="w-72 h-full mx-auto border rounded-lg">
          <div className="bg-green-100 cursor-pointer hover:bg-green-200 h-40 px-10 py-4 flex items-center justify-center">
            <img src={Mongo} alt="CSV Icon" className="w-20" />
          </div>
          <div className="flex justify-between items-center p-2">
            <p className="text-gray-800 ">From Web</p>
            <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 p-1">
              CSV
            </button>
          </div>
        </div>
        <div className="w-72 h-full mx-auto border rounded-lg">
          <div className="bg-blue-100 cursor-pointer hover:bg-blue-200 h-40  px-10 py-4 flex items-center justify-center">
            <img src={URL} alt="CSV Icon" className="w-20" />
          </div>
          <div className="flex justify-between items-center p-2">
            <p className="text-gray-800 ">MySQL</p>
            <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 p-1">
              CSV
            </button>
          </div>
        </div>
        <div className="w-72 h-full mx-auto border rounded-lg">
          <div className="bg-blue-100 cursor-pointer hover:bg-blue-200 h-40  px-10 py-4 flex items-center justify-center">
            <img src={MySql} alt="CSV Icon" className="w-20" />
          </div>
          <div className="flex justify-between items-center p-2">
            <p className="text-gray-800 ">MongoDB</p>
            <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 p-1">
              CSV
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center h-auto">
        <div className="bg-white p-8 max-w-2xl w-full text-center">
          {/* <div className="grid xl:grid-cols-4 space-x-4 mb-8">
          <div className="bg-black"></div>

          <div>
          <div
          onClick={() => onSelectSource("URL")}
          className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-200"
          >
          <img src={URL} alt="URL Icon" className="mx-auto mb-2" />
          </div>
          <div className="flex justify-between">
              <p className="text-gray-800 ">From Web</p>
              <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500">
              Import only
              </button>
              </div>
              </div>
              
              <div>
              <div
              onClick={() => onSelectSource("MySQL")}
              className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-200"
              >
              <img src={MySql} alt="MySQL Icon" className="mx-auto mb-2" />
              </div>
              <div className="flex justify-between">
              <p className="text-gray-800 ">MySQL</p>
              <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500">
              Import only
              </button>
              </div>
              </div>
              
          <div>
            <div
              onClick={() => onSelectSource("MongoDB")}
              className="bg-green-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-green-200"
              >
              <img src={Mongo} alt="MongoDB Icon" className="mx-auto mb-2" />
              </div>
              <div className="flex justify-between">
              <p className="text-gray-800">MongoDB</p>
              <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500">
              Import only
              </button>
              </div>
              </div>
              </div> */}

          {/* Step indicator */}
          <div className="flex justify-center mt-4 mb-6">
            <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
            <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
            <div className="h-1 w-8 bg-blue-200 rounded-full mx-1"></div>
          </div>

          {/* Back Button */}
        </div>

        <button
          onClick={onBack}
          className="px-6 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step3;
