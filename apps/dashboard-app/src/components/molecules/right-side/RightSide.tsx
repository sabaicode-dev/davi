import React, { useState } from "react";
import PieChartIcon from "@/public/images/right-side-icons/pie_chart.png";
import BarChartIcon from "@/public/images/right-side-icons/bar_chart.png";
import LineChartIcon from "@/public/images/right-side-icons/line_chart.png";
import { BsX, BsPencil, BsCheck } from "react-icons/bs";
import Button from "@/src/components/atoms/Button";

// Define the props interface for RightSide
interface RightSideProps {
  selectedData: Array<{ category: string; percentage: number }>;
  chartData: { _id: string; img: string }; // Data from API
  onClose: () => void;
}

const RightSide: React.FC<RightSideProps> = ({ chartData, onClose }) => {
  const [selectedChart, setSelectedChart] = useState<string | null>("pie");

  // Description State
  const [description, setDescription] = useState(
    "The table lists baby products, with each product labeled under the 'toys & baby products' main category and 'Baby Products' subcategory. All products in the list belong to the same category and subcategory."
  );
  const [isEditing, setIsEditing] = useState(false);

  // Handle Edit Toggle
  const toggleEdit = () => setIsEditing(!isEditing);

  // Handle Input Change
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <div className="flex flex-col w-[400px] h-full fixed top-16 right-0 bg-white shadow-2xl z-50 overflow-y-scroll">
      {/* Header */}
      <div className="flex flex-row justify-between items-center px-6 py-4 border-b">
        <h1 className="text-[16px] font-bold">Recommend Chart</h1>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition duration-150"
          aria-label="Close"
        >
          <BsX className="w-6 h-6" />
        </button>
      </div>

      {/* Chart Selection */}
      <div className="flex justify-around px-6 py-4">
        <button
          onClick={() => setSelectedChart("pie")}
          className={`flex flex-col items-center rounded-md p-2 ${
            selectedChart === "pie" ? "ring-2 ring-blue-500" : ""
          } hover:bg-gray-100`}
        >
          <img src={PieChartIcon} alt="Pie Chart" className="w-8 h-8" />
          <h1 className="text-xs font-bold mt-2">Pie Chart</h1>
        </button>
        <button
          onClick={() => setSelectedChart("bar")}
          className={`flex flex-col items-center rounded-md p-2 ${
            selectedChart === "bar" ? "ring-2 ring-blue-500" : ""
          } hover:bg-gray-100`}
        >
          <img src={BarChartIcon} alt="Bar Chart" className="w-8 h-8" />
          <h1 className="text-xs font-bold mt-2">Bar Chart</h1>
        </button>
        <button
          onClick={() => setSelectedChart("line")}
          className={`flex flex-col items-center rounded-md p-2 ${
            selectedChart === "line" ? "ring-2 ring-blue-500" : ""
          } hover:bg-gray-100`}
        >
          <img src={LineChartIcon} alt="Line Chart" className="w-8 h-8" />
          <h1 className="text-xs font-bold mt-2">Line Chart</h1>
        </button>
      </div>

      {/* Visualize Overview */}
      <div className="px-6 py-4">
        <h2 className="text-sm font-bold mb-2">Visualize Overview</h2>
        <div className="flex justify-center items-center">
          {chartData.img ? (
            <img
              src={chartData.img}
              alt="Generated Chart"
              className="w-full h-auto max-h-[400px] object-contain"
            />
          ) : (
            <p className="text-gray-500">No chart available</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <h2 className="text-sm font-bold mb-2">Description</h2>
        <div className="flex justify-between items-start">
          {isEditing ? (
            <textarea
              className="w-full text-sm text-gray-600 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={handleDescriptionChange}
              rows={4}
            />
          ) : (
            <p className="text-sm text-gray-600">{description}</p>
          )}
          <button
            onClick={toggleEdit}
            className="text-gray-500 hover:text-blue-500 transition ml-2"
            aria-label={isEditing ? "Save" : "Edit"}
          >
            {isEditing ? (
              <BsCheck className="w-5 h-5" />
            ) : (
              <BsPencil className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end px-6 py-4 border-t">
        <Button
          children="Save"
          size="medium"
          radius="2xl"
          color="primary"
          className="px-12 py-2"
        />
      </div>
    </div>
  );
};

export default RightSide;
