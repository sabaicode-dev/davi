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
      <div className="flex flex-col justify-center items-center p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Pick a data source to start
        </h2>
        <div className="flex flex-row  w-full space-x-5">
          {/* Upload file CSV */}
          <div
            onClick={() => onSelectSource("CSV")}
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
          {/* Import URL for scraping */}
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
          {/* Upload SQL database */}
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
          {/* Upload Mongodb */}
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
        <div className="flex flex-row justify-center items-center h-auto mt-36 w-full xl:mt-60 2xl:mt-80">
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-200 rounded-full mx-1"></div>
        </div>
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
    </div>
  );
};

export default Step3;
