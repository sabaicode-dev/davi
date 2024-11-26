import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"; // Import icons for edit and save
import { Xicon } from "../../atoms/icons/Icon";

type AnalysisProps = {
  selectedData: { category: string; percentage: number } | null;
  onClose: () => void;
};

const Analysis: React.FC<AnalysisProps> = ({ selectedData, onClose }) => {
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [description, setDescription] = useState(
    "Default explanation of the data."
  ); // Default description

  const sidebarRef = useRef<HTMLDivElement>(null); // Reference for the sidebar

  // Close sidebar on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose(); // Call the onClose function if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleSaveClick = () => {
    setIsEditing(false); // Save and exit edit mode
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value); // Update description value
  };

  if (!selectedData) return null; // Don't render if no data is selected

  return (
    <div
      ref={sidebarRef}
      className="fixed right-5 top-20 bottom-0 w-[428px] h-[855px] bg-white p-5 shadow-2xl overflow-y-auto"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="float-right text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <Xicon/>
      </button>

      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">
        {selectedData.category} (2020)
      </h2>

      {/* Summary Information */}
      <div className="flex gap-3 mb-5">
        <div className="bg-blue-300 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Rows</p>
          <p className="text-lg font-bold">150</p>
        </div>
        <div className="bg-orange-400 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Empty Row</p>
          <p className="text-lg font-bold">0</p>
        </div>
        <div className="bg-purple-300 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Unique Values</p>
          <p className="text-lg font-bold">90</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">Description</h3>
        <div className="flex items-start">
          {isEditing ? (
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="border border-gray-300 rounded-lg w-full p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3} // Adjust rows as needed
              placeholder={isEditing ? "" : "Enter your description"}
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap flex-grow">
              {description}
            </p>
          )}
          <button
            onClick={isEditing ? handleSaveClick : handleEditClick}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            {isEditing ? <AiOutlineCheck size={20} /> : <AiOutlineEdit size={20} />}
          </button>
        </div>
      </div>

      {/* Data Type Section */}
      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">Data Type</h3>
        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
          Number
        </span>
      </div>

      {/* Distribution Bar Chart */}
      <div className="mt-5">
        <h3 className="text-lg font-medium mb-3">Distribution</h3>
        <div className="bg-gray-200 h-40 flex items-center justify-center">
          {/* Placeholder for the bar chart */}
          <p>Bar Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
