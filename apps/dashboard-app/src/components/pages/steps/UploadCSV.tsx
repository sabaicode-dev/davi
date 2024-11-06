import React from "react";
import Logo from "@/public/images/step/step4_pic.png";
import { useRef, useState } from "react";
interface StepTwoProps {
  onBack: () => void;
}
const UploadCsv: React.FC<StepTwoProps> = ({ onBack }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input
  const [fileName, setFileName] = useState<string>(""); // State to manage the uploaded file name
  const [error, setError] = useState<string>(""); // State to manage error message

  const handleFileUpload = () => {
    // Trigger the file input click
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the selected file is a CSV
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setFileName(file.name); // Set the file name to display
        setError(""); // Clear any previous error
      } else {
        setError("Please upload a valid CSV file."); // Set error message if not CSV
      }
    } else {
      setError("No file selected."); // Set error if no file was selected
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-full pt-20">
        <div className="flex w-full max-w-4xl p-10  space-x-8">
          {/* Left Image Section */}
          <div className="w-1/2 flex items-center justify-center">
            <img src={Logo} alt="Illustration" className="w-full h-auto" />
          </div>

          {/* Right Form Section */}
          <div className="w-1/2 pt-11 flex flex-col space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Upload and Attach Files
            </h2>
            <p className="text-gray-600">
              Upload and attach files to this project.
            </p>

            {/* File Upload Section */}
            <div
              className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center cursor-pointer"
              onClick={handleFileUpload} // Trigger file upload on click
            >
              <p className="text-blue-600 font-medium">Click to upload</p>
              <p className="text-gray-500">or drag and drop</p>
              <p className="text-sm text-gray-400">Support CSV</p>
              <input
                type="file"
                accept=".csv" // Accept only CSV files
                ref={fileInputRef} // Attach ref to the input
                onChange={handleFileChange} // Handle file selection
                className="hidden" // Hide the file input
              />
              {fileName && (
                <div className="mt-4">
                  <p className="text-gray-700">File: {fileName}</p>
                  <div className="relative h-2 mt-2 bg-gray-200 rounded-full">
                    <div className="absolute top-0 left-0 h-full w-full bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">100% Complete</p>
                </div>
              )}
              {error && <p className="mt-2 text-red-600">{error}</p>}{" "}
              {/* Display error message */}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={onBack}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md font-semibold hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={() =>
                  fileName && console.log("Proceeding to next step...")
                } // Replace with actual logic for next step
                className={`px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 ${
                  !fileName ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!fileName} // Disable the button if no file is selected
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Step Indicator */}
      </div>
      <div className="flex justify-center ">
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
      </div>
    </div>
  );
};

export default UploadCsv;
