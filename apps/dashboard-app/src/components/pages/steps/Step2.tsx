// Step2.tsx
import React from "react";
import Logo from "@/public/images/step/step2_pic.png";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  return (
    <div className="mx-auto  max-w-4xl  p-10">
      <div className="flex ">
        {/* Left Image Section */}
        <div className="flex-1 p-8">
          <img
            src={Logo} // Update this path to your image
            alt="Project Created"
            className="w-full h-auto"
          />
        </div>

        {/* Right Form Section */}
        <div className="flex-1 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Project created
          </h2>
          <p className="text-gray-600 mb-6">
            Please enter a Name and Description for this project.
          </p>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="projectName">
              Project name
            </label>
            <input
              type="text"
              id="projectName"
              placeholder="Enter name..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter details to visualize and showcase your product information efficiently"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-between">
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
          <div className="h-1 w-8 bg-blue-200 rounded-full mx-1"></div>
          <div className="h-1 w-8 bg-blue-200 rounded-full mx-1"></div>
        </div>
    </div>
  );
};

export default Step2;
