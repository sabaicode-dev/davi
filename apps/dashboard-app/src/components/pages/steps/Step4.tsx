// src/components/Step4.tsx
import React from "react";
import Logo from "@/public/images/step/step4_pic.png";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
  selectedSource: string; // To display the selected data source
}

const Step4: React.FC<Step4Props> = ({ onNext, onBack, selectedSource }) => {
  return (
    <div className="mx-auto max-w-4xl bg-white  p-10">
      <div className="flex w-full ">
        {/* Left Image Section */}
        <div className="flex-1 p-8">
          <img
            src={Logo} // Update this path to your image
            alt="Data Scraping Tool"
            className="w-full h-auto"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Import Link & Data Scraping Tool
            </h2>
            <p className="text-gray-600 mb-6">
              Selected Source: {selectedSource}{" "}
              {/* Display the selected data source */}
            </p>

            <p className="text-gray-600 mb-4">
              Easily import links to automatically extract and display relevant
              data.
            </p>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="shareLink">
                Share link
              </label>
              <input
                type="url"
                id="shareLink"
                placeholder="www.example.com/product"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Button Section */}
          <div className="flex justify-between mt-6">
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Back
            </button>
            <button
              onClick={onNext}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Next
            </button>
          </div>

          {/* Step indicator */}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
      </div>
    </div>
  );
};

export default Step4;
