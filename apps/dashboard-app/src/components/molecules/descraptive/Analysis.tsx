import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai"; // Import icons for edit and save
import { XIcon } from "../../atoms/icons/Icon"; // Replace with your custom icon path

// Import chart components
import Boolean from "../charts/Boolean";
import Category from "../charts/Catagory";
import Number from "../charts/Number";
import UniqueValue from "../charts/UniqueValue";

type ChartSelectionData = {
  category: string;
  percentage: number;
  type: string;
};

type ChartMetadata = {
  key: string;
  type: string;
  data: any[];
  labels?: string[];
  value?: any;
  total?: any;
};

type AnalysisProps = {
  selectedData: ChartSelectionData | null;
  onClose: () => void;
  metadata: ChartMetadata[];
};

// Types for the Category component
type CategoryProps = {
  data: DataItem[];
  title?: string;
  type?: string;
  onClick?: (item: DataItem) => void;
  onChartSelect?: (data: ChartSelectionData) => void;
};

type DataItem = {
  category: string;
  value: number;
};



// Chart type configuration
const chartTypes = [
  {
    type: "Number",
    component: Number,
  },
  {
    type: "Category",
    component: Category,
  },
  {
    type: "Boolean",
    component: Boolean,
  },
  {
    type: "UniqueValue",
    component: UniqueValue,
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
  if (!selectedData) {
    return <div>No data selected.</div>;
  }

  switch (selectedData.type) {
    case "Number":
      // Render analysis for number data
      break;
    case "Boolean":
      // Render analysis for boolean data
      break;
    case "Category":
      // Render analysis for category data
      break;
    case "UniqueValue":
      // Render analysis for unique value data
      break;
    default:
      return <div>No analysis available for the selected data.</div>;
  }

  // Find matching metadata for the selected data
  const matchingMetadata = metadata.find(
    (meta) =>
      meta.key === selectedData.category && meta.type === selectedData.type
  );

  if (!matchingMetadata) {
    return (
      <div>
        No metadata found for the selected data type: {selectedData.type}.
      </div>
    );
  }

  // Check if matchingMetadata exists and handle the data appropriately
  const chartData = matchingMetadata?.data ? matchingMetadata.data : [];

  // Ensure the data is in the correct format (e.g., array of numbers)
  const transformedData =
    activeChartType === "Number"
      ? matchingMetadata?.data || [] // Array of numbers
      : activeChartType === "Boolean"
      ? matchingMetadata?.data || { true: 0, false: 0 } // Object with true/false keys
      : activeChartType === "Category"
      ? matchingMetadata?.data || [] // Array of category objects
      : activeChartType === "UniqueValue"
      ? { value: matchingMetadata?.value, total: matchingMetadata?.total }
      : [];

  // Find the active chart configuration
  const ActiveChartConfig = chartTypes.find(
    (chart) => chart.type === activeChartType
  );

  const booleanData = {
    true: 120, // Example count for true
    false: 30, // Example count for false
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

        {/* {ActiveChartConfig ? (
          <ActiveChartConfig.component
            data={transformedData} // Pass transformed data to the chart
            labels={matchingMetadata?.labels || []} // Pass labels if available
          />
        ) : (
          <p className="text-gray-500 text-center">
            No chart available for this data type.
          </p>
        )} */}
      </div>
    </div>
  );
};

export default Analysis;
