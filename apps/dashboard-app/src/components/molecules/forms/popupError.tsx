import React from "react";
import { FaTimes, FaMinus } from "react-icons/fa"; // Import icons
import { BiExpandAlt } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";

interface ErrorPopupProps {
  errors: string[];
  onConfirm: () => void;
  onCancel: () => void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({
  errors,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-3 relative">
        {/* Header with macOS-style buttons */}
        <div className="flex items-center justify-start gap-2 mb-4">
          {/* Red Button (Close) */}
          <button
            className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center group focus:outline-none"
            onClick={onCancel}
            aria-label="Close"
          >
            <FaTimes className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Yellow Button (Minimize) */}
          <button
            className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center group focus:outline-none"
            aria-label="Minimize"
          >
            <FaMinus className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Green Button (Maximize) */}
          <button
            className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center group focus:outline-none"
            aria-label="Maximize"
          >
            <BiExpandAlt className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Content */}
        <div className="mx-5 mb-3">
          <h2 className="flex justify-center text-xl font-semibold text-gray-900 mb-4 w-full">
            Errors Detected
          </h2>
          <p className="flex items-center text-gray-700 mb-4 bg-yellow-50 p-4 rounded-md shadow-sm">
            <CiWarning className="text-yellow-500 text-xl mr-3" />
            Make sure your connection is correct !
          </p>

          <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>

          {/* Footer with action buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Go Back
            </button>
            <button
              onClick={onConfirm}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
