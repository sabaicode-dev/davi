// src/components/Step3.tsx
import React from "react";
import Logo from "@/public/images/step/step1_pic.png";

interface Step3Props {
  onNext: () => void;
  onBack?: () => void;
  onSelectSource: (source: string) => void; // Added for selecting a source
}

const Step3: React.FC<Step3Props> = ({ onBack, onSelectSource }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Pick a data source to start
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Card for CSV */}
          <div
            onClick={() => onSelectSource("CSV")} // Handle click
            className="bg-green-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-green-200"
          >
            <img src={Logo} alt="CSV Icon" className="mx-auto mb-2" />
            <p className="text-gray-800 font-semibold">Upload File</p>
            <p className="text-xs text-gray-500">CSV</p>
          </div>

          {/* Card for Web URL */}
          <div
            onClick={() => onSelectSource("URL")}
            className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-200"
          >
            <img src={Logo} alt="URL Icon" className="mx-auto mb-2" />
            <p className="text-gray-800 font-semibold">From Web</p>
            <p className="text-xs text-gray-500">Import only</p>
          </div>

          {/* Card for MySQL */}
          <div
            onClick={() => onSelectSource("MySQL")}
            className="bg-blue-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-blue-200"
          >
            <img src={Logo} alt="MySQL Icon" className="mx-auto mb-2" />
            <p className="text-gray-800 font-semibold">MySQL</p>
            <p className="text-xs text-gray-500">Import only</p>
          </div>

          {/* Card for MongoDB */}
          <div
            onClick={() => onSelectSource("MongoDB")}
            className="bg-green-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-green-200"
          >
            <img src={Logo} alt="MongoDB Icon" className="mx-auto mb-2" />
            <p className="text-gray-800 font-semibold">MongoDB</p>
            <p className="text-xs text-gray-500">Import only</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center mt-4 mb-6">
          <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-1 w-8 bg-blue-200 rounded-full mx-1"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Step3;
