import React, { useEffect, useState } from "react";
import { BsX, BsPencil, BsCheck } from "react-icons/bs";
import Button from "@/src/components/atoms/Button";
import { SaveDialog } from "@/src/components/molecules/models/Save_V1/SaveVisualizeV1";
import Modal from "@/src/components/molecules/models/Save_V2/SaveVisualizeV2";
import axios from "axios";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

// Define the props interface for RightSide
interface RightSideProps {
  chartData: Array<{ chartType: string; img: string }>; // Chart data with type and image URL
  selectedColumns: string[];
  onSelectChart: (chartType: string) => void; // Callback for selecting a chart type
  onClose: () => void;
}

const RightSide: React.FC<RightSideProps> = ({
  chartData,
  selectedColumns,
  onSelectChart,
  onClose,
}) => {
  const [selectedChart, setSelectedChart] = useState<string | null>(
    chartData[0]?.chartType || null
  );

  // Description State
  const [descriptionsCache, setDescriptionsCache] = useState<
    Record<string, string>
  >({});
  const [description, setDescription] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedVisualizations, setSavedVisualizations] = useState<any[]>([]);
  const [isLoadingDescription, setIsLoadingDescription] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle Edit Toggle
  const toggleEdit = () => {
    if (isEditing) {
      saveDescription(); // Save the edited description when exiting edit mode
    }
    setIsEditing(!isEditing);
  };

  // Save Description
  const saveDescription = () => {
    if (!selectedChart || !selectedColumns.length) return;

    const cacheKey = generateCacheKey(selectedColumns, selectedChart);

    // Update the cache with the edited description
    setDescriptionsCache((prevCache) => ({
      ...prevCache,
      [cacheKey]: description || "",
    }));

    console.log("Description saved:", description);
  };

  // Handle Input Change
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // Handle Chart Selection
  const handleChartSelection = (chartType: string) => {
    setSelectedChart(chartType);
    onSelectChart(chartType); // Trigger parent callback
  };

  const generateCacheKey = (columns: string[], chartType: string | null) => {
    return `${columns.join(",")}-${chartType}`;
  };

  const fetchDescription = async () => {
    if (!selectedChart) {
      setError("No chart type selected.");
      return;
    }

    if (selectedColumns.length === 0) {
      setError("No columns selected.");
      return;
    }

    const cacheKey = generateCacheKey(selectedColumns, selectedChart);

    // Check if the description is already cached
    if (descriptionsCache[cacheKey]) {
      setDescription(descriptionsCache[cacheKey]);
      console.log(
        "Description fetched from cache:",
        descriptionsCache[cacheKey]
      );
      return;
    }

    try {
      setIsLoadingDescription(true);
      setError(null);

      // Construct payload
      const payload = {
        columns: selectedColumns,
        chart_type: selectedChart.replace("_", ""),
      };

      console.log("Payload for description API:", payload); // Debug log

      const response = await axios.post(
        `${API_ENDPOINTS.API_URL}/generate-description/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Description API response:", response.data); // Debug log
        setDescription(response.data.description);

        // Cache the description
        setDescriptionsCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: response.data.description,
        }));
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      console.error("Error fetching description:", errorMessage); // Debug log
    } finally {
      setIsLoadingDescription(false);
    }
  };

  // Auto-fetch description when selectedColumns or selectedChart changes
  useEffect(() => {
    fetchDescription();
  }, [selectedColumns, selectedChart]);

  useEffect(() => {
    // Load saved visualizations from localStorage
    const savedData = JSON.parse(
      localStorage.getItem("savedVisualizations") || "[]"
    );
    setSavedVisualizations(savedData);
  }, []);

  const handleSaveNew = (name: string) => {
    const selectedChartData = chartData.find(
      (chart) => chart.chartType === selectedChart
    );

    const visualizationData = {
      name,
      chartType: selectedChart,
      chartImage: selectedChartData?.img,
      description,
      selectedColumns,
      date: new Date().toISOString(),
    };

    const updatedVisualizations = [...savedVisualizations, visualizationData];
    localStorage.setItem(
      "savedVisualizations",
      JSON.stringify(updatedVisualizations)
    );
    setSavedVisualizations(updatedVisualizations);
    setIsDialogOpen(false); // Close the dialog
    setIsModalOpen(false); // Close the modal if open
  };

  const handleSaveExisting = (name: string) => {
    const updatedVisualizations = savedVisualizations.map((viz) =>
      viz.name === name
        ? {
            ...viz,
            charts: [
              ...(viz.charts || []),
              {
                chartType: selectedChart,
                chartImage: chartData.find(
                  (chart) => chart.chartType === selectedChart
                )?.img,
                description,
                selectedColumns,
                date: new Date().toISOString(),
              },
            ],
          }
        : viz
    );

    localStorage.setItem(
      "savedVisualizations",
      JSON.stringify(updatedVisualizations)
    );
    setSavedVisualizations(updatedVisualizations);
    setIsModalOpen(false); // Close the modal
  };

  const handleSaveButtonClick = () => {
    if (savedVisualizations.length === 0) {
      setIsDialogOpen(true);
    } else {
      setIsModalOpen(true);
    }
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
      <div className="flex flex-wrap justify-around px-6 py-4">
        {chartData.map((chart) => (
          <button
            key={chart.chartType}
            onClick={() => handleChartSelection(chart.chartType)}
            className={`flex flex-col items-center rounded-md p-2 ${
              selectedChart === chart.chartType ? "ring-2 ring-blue-500" : ""
            } hover:bg-gray-100`}
          >
            <img
              src={chart.img}
              alt={`${chart.chartType} Icon`}
              className="w-8 h-8"
            />
            <h1 className="text-xs font-bold mt-2 capitalize">
              {chart.chartType.replace("_", " ")}
            </h1>
          </button>
        ))}
      </div>

      {/* Visualize Overview */}
      <div className="px-6 py-4">
        <h2 className="text-sm font-bold mb-2">Visualize Overview</h2>
        <div className="flex justify-center items-center">
          {selectedChart ? (
            <img
              src={
                chartData.find((chart) => chart.chartType === selectedChart)
                  ?.img
              }
              alt={`${selectedChart} Chart`}
              className="w-full h-auto max-h-[400px] object-contain"
            />
          ) : (
            <p className="text-gray-500">No chart selected</p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-4">
        <h2 className="text-sm font-bold mb-2">Description</h2>
        {isLoadingDescription ? (
          <p className="text-gray-500">Loading description...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex justify-between items-start">
            {isEditing ? (
              <textarea
                className="w-full text-sm text-gray-600 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description || ""}
                onChange={handleDescriptionChange}
                rows={4}
              />
            ) : (
              <p className="text-sm text-gray-600">
                {description || "No description available."}
              </p>
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
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end px-6 py-4 border-t">
        <Button
          children="Save"
          size="medium"
          radius="2xl"
          onClick={handleSaveButtonClick}
          color="primary"
          className="px-12 py-2"
        />
      </div>

      {/* Conditional Dialog */}
      <SaveDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={(name) => handleSaveNew(name)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(name) => handleSaveExisting(name)}
        onSaveNew={() => {
          setIsModalOpen(false); // Close Modal
          setTimeout(() => setIsDialogOpen(true), 100); // Open SaveDialog after delay
        }}
        savedVisualizations={savedVisualizations}
      />
    </div>
  );
};

export default RightSide;
