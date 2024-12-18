import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"; // Import icons for edit and save
import { XIcon } from "../../atoms/icons/Icon"; // Replace with your custom icon path

// Import chart components
import NumberBig from "../charts/NumberBig";
import Boolean from "../charts/Boolean";
import CategoryBig from "../charts/CatagoryBig";
import UniqueValueBig from "../charts/UniqueValueBig";
import BooleanBig from "../charts/BooleanBig";

// Define ChartMetadata type
type ChartMetadata = {
  key: string;
  type: string;
  data: any[];
  labels?: string[];
  value?: any;
  total?: any;
};

// Define props for the Analysis component
type AnalysisProps = {
  selectedData: {
    category: string;
    percentage: number;
    type: string;
  } | null;
  onClose: () => void;
  metadata: ChartMetadata[];
  renderChart?: (col: ChartMetadata) => JSX.Element | null;
};

// Chart type configuration
const chartTypes = [
  {
    type: "Number",
    component: NumberBig,
  },
  {
    type: "Category",
    component: CategoryBig,
  },
  {
    type: "Boolean",
    component: BooleanBig,
  },
  {
    type: "UniqueValue",
    component: UniqueValueBig,
  },
];

const Analysis: React.FC<AnalysisProps> = ({
  selectedData,
  onClose,
  metadata,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(
    "Default explanation of the data."
  );
  const [activeChartType, setActiveChartType] = useState<string | null>(null);

  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Set initial chart type when data is selected
  useEffect(() => {
    if (selectedData) {
      setActiveChartType(selectedData.type);
    }
  }, [selectedData]);

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Save the edited description
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  // Handle description text change
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // Do not render if no data is selected
  if (!selectedData) return null;

  // Find matching metadata for the selected data
  const matchingMetadata = metadata.find(
    (meta) => meta.type === selectedData.type
  );

  // Check if matchingMetadata exists and handle the data appropriately
  const chartData = matchingMetadata?.data ? matchingMetadata.data : [];

  // Ensure the data is in the correct format (e.g., array of numbers)
  const transformedData = Array.isArray(chartData)
  ? chartData.map((item) => {
      if (activeChartType === "Number") {
        return typeof item === "number" ? item : 0;
      } else if (activeChartType === "Category") {
        return item;
      } else if (activeChartType === "Boolean") {
        if (activeChartType === "Boolean") {
          return item === "true" || item === 1; // Ensure boolean values are handled
        }
        // other chart type logic
        return item;
      } else if (activeChartType === "UniqueValue") {
        return item;
      }
      return 0;
    })
  : [];


  // Find the active chart configuration
  const ActiveChartConfig = chartTypes.find(
    (chart) => chart.type === activeChartType
  );
  const booleanData = {
    true: 120,  // Example count for true
    false: 30,  // Example count for false
  };
  return (
    <div
      ref={sidebarRef}
      className="fixed right-5 top-16 bottom-0 w-[428px] h-[855px] bg-white p-5 shadow-2xl overflow-y-auto z-20"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="float-right text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <XIcon />
      </button>

      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">{selectedData.category}</h2>

      {/* Summary Information */}
      <div className="flex gap-3 mb-5">
        <div className="bg-blue-300 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Rows</p>
          <p className="text-lg font-bold">150</p>
        </div>
        <div className="bg-orange-300 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Empty Rows</p>
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
              rows={3}
              placeholder="Enter your description"
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
            {isEditing ? (
              <AiOutlineCheck size={20} />
            ) : (
              <AiOutlineEdit size={20} />
            )}
          </button>
        </div>
      </div>

      {/* Data Type Section */}
      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">Data Type</h3>
        <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-md">
          {selectedData.type}
        </span>
      </div>

      {/* Distribution Section with Chart Type Selector */}
      <div className="mt-5">
        <h3 className="text-lg font-medium mb-3">Distribution</h3>

        {ActiveChartConfig ? (
          <ActiveChartConfig.component
            data={transformedData} // Pass transformed data to the chart
            labels={matchingMetadata?.labels || []} // Pass labels if available
          />
        ) : (
          <p className="text-gray-500 text-center">
            No chart available for this data type.
          </p>
        )}
      </div>
    </div>
  );
};

export default Analysis;
