import React, { useEffect, useState } from "react";
import icon from "@/public/images/icon-cleaning.png";
import Button from "../../atoms/Button";
import { DeleteIcon, DownloadIcon, V } from "../../atoms/icons/Icon";
import Input from "../../atoms/Input";
import { CiFilter } from "react-icons/ci";
import Table from "../tables/Table";
import { useParams, useLocation } from "react-router-dom";
import Spinner from "../loading/Spinner";
import RightSide from "@/src/components/molecules/right-side/RightSide";
import axios from "axios";
import download from "downloadjs";
import Analysis from "../descraptive/Analysis";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

export interface ChartSelectionData {
  category: string;
  percentage: number;
  type: string;
  name?: string;
}

export interface ChartMetadata {
  key: string;
  name?: string;
  description?: string;
  table_column_info: {
    type: "STRING" | "NUMERIC" | "BOOLEAN" | "DATE_TIME";
    order?: number;
    original_type?: string;
    extended_type: string;
  };
  table_column_metrics: {
    total_count?: number;
    non_null_count?: number;
    valid_count?: number;
    string_metrics?: {
      counts: { key: string; value: number }[];
      most_common_value?: string;
      most_common_value_count?: number;
      unique_value_count?: number;
    };
    numeric_metrics?: {
      histogram: { range: string; count: number }[];
    };
    boolean_metrics?: {
      true_count: number;
      false_count: number;
    };
  };
}

interface ApiResponse {
  count: number;
  next: boolean;
  previous: boolean;
  pages: number[];
  results: any[];
  headers: string[];
  file: string;
  filename: string;
  dataset_summary?: {
    total_rows: number;
    total_columns: number;
    file_type: string;
    file_size: number;
  };
}

interface TableProps {
  headers: string[];
  data: any[];
  total_rows?: number;
  total_column?: number;
  filename?: string;
}

const FinalScreen: React.FC = () => {
  const [fileDetails, setFileDetails] = useState({
    filename: "Employee Survey.CSV",
    totalRows: 0,
    totalColumns: 0,
  });

  const [tableData, setTableData] = useState<TableProps>({
    headers: [],
    data: [],
  });
  const [visibleHeaders, setVisibleHeaders] = useState<Set<string>>(new Set()); // Tracks visible headers
  const [metadata, setMetadata] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [selectedChartType, setSelectedChartType] =
    useState<string>("pie_chart");
  const [showRightSide, setShowRightSide] = useState(false);
  const [chartData, setChartData] = useState<
    Array<{ chartType: string; img: string }>
  >([]);
  const [selectedColumnData, setSelectedColumnData] = useState<
    Record<string, any>[] | null
  >(null);

  const [descriptionMap, setDescriptionMap] = useState<{
    [key: string]: string;
  }>({});

  const [showPopup, setShowPopup] = useState(false); // Tracks popup visibility
  const { projectId, fileId } = useParams();
  const [isLoadingVisualize, setIsLoadingVisualize] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleFileDetailsUpdate = (details: {
    filename: string;
    totalRows: number;
    totalColumns: number;
  }) => {
    setFileDetails(details);
  };

  const [selectedAnalysis, setSelectedAnalysis] = useState<{
    category: string;
    percentage: number;
    type: string;
    name: string;
  } | null>(null);
  const location = useLocation(); // Access state passed from CleaningProject
  // const metadataId = location.state?.metadataId; // Retrieve metadataId from navigation state
  const metadataId =
    location.state?.metadataId || localStorage.getItem("metadataId");

  useEffect(() => {
    if (!metadataId) {
      console.error("metadataId is missing in FinalScreen.");
    } else {
      console.log("FinalScreen metadataId:", metadataId);
    }
  }, [metadataId]);

  useEffect(() => {
    if (!metadataId || !projectId || !fileId) {
      setError(
        "Missing required parameters (metadataId, projectId, or fileId)."
      );
      return;
    }
    fetchData();
  }, [metadataId, projectId, fileId]);

  // Fetch Table Data and Metadata
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Fetch table data
      const tableResponse = await fetch(
        `${API_ENDPOINTS.API_URL}/project/${projectId}/file/${fileId}/details/`
      );

      if (!tableResponse.ok) {
        throw new Error(`HTTP error! status: ${tableResponse.status}`);
      }

      const tableJsonData: ApiResponse = await tableResponse.json();
      console.log("Fetched table data:", tableJsonData);

      // Update state with fetched table data
      setTableData({
        headers: tableJsonData.headers,
        data: tableJsonData.results,
        total_rows: tableJsonData.dataset_summary?.total_rows,
        total_column: tableJsonData.dataset_summary?.total_columns,
        filename: tableJsonData.filename,
      });

      setVisibleHeaders(new Set(tableJsonData.headers));

      // Update file details
      if (tableJsonData.dataset_summary) {
        handleFileDetailsUpdate({
          filename: tableJsonData.filename || "",
          totalRows: tableJsonData.dataset_summary.total_rows || 0,
          totalColumns: tableJsonData.dataset_summary.total_columns || 0,
        });
      }
      // Fetch Metadata
      const metadataResponse = await fetch(
        `${API_ENDPOINTS.API_URL}/metadata/${metadataId}/`
      );

      if (!metadataResponse.ok) {
        throw new Error(
          `Failed to fetch metadata. Status: ${metadataResponse.status}`
        );
      }

      const metadataJson = await metadataResponse.json();
      console.log("Fetched metadata:", metadataJson);

      if (metadataJson.metadata) {
        setMetadata(metadataJson.metadata);
      } else {
        setError("No metadata available.");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChartSelect = (
    metadata: ChartMetadata | ChartMetadata[],
    chartData: ChartSelectionData
  ) => {
    console.log("Chart Data:", chartData); // Debug chart data
    console.log("Metadata:", metadata); // Debug metadata

    // Ensure metadata is always treated as an array
    const metadataArray = Array.isArray(metadata) ? metadata : [metadata];

    // Find the matching metadata by key
    const matchedMetadata = metadataArray.find(
      (meta) => meta.key === chartData.category
    );

    console.log("Matched Metadata:", matchedMetadata); // Debug matched metadata

    if (matchedMetadata) {
      const updatedAnalysis = {
        name: matchedMetadata.name || "Default Name", // Fallback to a default name
        category: chartData.category,
        percentage: chartData.percentage,
        type: chartData.type,
      };

      setSelectedAnalysis(updatedAnalysis);
    } else {
      setSelectedAnalysis(null);
    }

    if (!matchedMetadata) {
      console.warn(
        `No matching metadata found for category: ${chartData.category}`
      );
    }
  };

  const handleColumnSelection = (columns: string[], columnData: any[]) => {
    if (JSON.stringify(selectedColumns) !== JSON.stringify(columns)) {
      setSelectedColumns(columns);
      setSelectedColumnData(columnData);
    }
  };

  const handleChartTypeChange = (chartType: string) => {
    setSelectedChartType(chartType);
  };

  const handleVisualizeClick = async () => {
    if (selectedColumns.length === 0 || !fileId) return;
    setIsLoadingVisualize(true); // Set loading to true

    try {
      // Clear previous chart data to prevent duplicates
      setChartData([]);

      const newChartData: Array<{ chartType: string; img: string }> = [];
      const chartTypes = [
        "pie_chart",
        "donut_chart",
        "area_chart",
        "map_chart",
      ];

      for (const chartType of chartTypes) {
        const payload = {
          chart_name: chartType,
          x_axis: selectedColumns[0],
          y_axis: selectedColumns[1] || null,
          file_id: fileId,
        };

        const response = await fetch(`${API_ENDPOINTS.API_URL}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error(`Failed to fetch ${chartType} data`);

        const data = await response.json();
        newChartData.push({ chartType, img: data.img });
      }

      setChartData((prev) => [...(prev || []), ...newChartData]);
      setShowRightSide(true);
    } catch (error) {
      console.error("Error visualizing chart:", error);
    } finally {
      setIsLoadingVisualize(false); // Set loading to false
    }
  };

  const handleCloseRightSide = () => {
    setShowRightSide(false);
    setChartData([]);
    setSelectedColumnData(null);
  };

  // Download Handler
  const handleDownLoadFile = async () => {
    if (!projectId || !fileId || !fileDetails.filename) {
      console.error("Missing required parameters for downloading the file.");
      setError("Project ID, File ID, or filename is missing");
      return;
    }

    try {
      const res = await axios.get(
        `${API_ENDPOINTS.API_URL}/project/${projectId}/file/download/${fileDetails.filename}/`,
        {
          responseType: "blob", // To ensure the response is treated as a binary blob
          onDownloadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / (progressEvent.total || 1)) * 100
            );
            console.log(`Download Progress: ${progress}%`);
          },
        }
      );

      // Validate response
      if (res.status !== 200) {
        throw new Error("Failed to download the file. Please try again.");
      }

      // Use downloadjs to trigger the file download
      download(res.data, fileDetails.filename, "application/octet-stream");

      console.log("File downloaded successfully.");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during the download.";
      setError(errorMessage);
      console.error("Error during file download:", error);
    }
  };

  // Toggle Popup visibility
  const handleFilterClick = () => {
    setShowPopup(!showPopup);
  };

  // Handle header visibility toggle
  const handleCheckboxChange = (header: string) => {
    const updatedHeaders = new Set(visibleHeaders);
    if (updatedHeaders.has(header)) {
      updatedHeaders.delete(header); // Hide header
    } else {
      updatedHeaders.add(header); // Show header
    }
    setVisibleHeaders(updatedHeaders);
  };

  const handleCloseAnalysis = () => {
    setSelectedAnalysis(null);
  };

  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Spinner />
      </div>
    );

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Spinner />
      </div>
    );

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div
      className="flex flex-col overflow-hidden mt-8 h-[200px]"
      style={{ width: "100%", height: "30%" }}
    >
      <div className="flex flex-row justify-between items-center mb-3">
        <div className="flex flex-row gap-x-3 justify-center items-center">
          <div className="flex rounded-full bg-[#F4EBFF] w-12 h-12 justify-center items-center">
            <img src={icon} alt="" className="w-5 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold mb-1">{fileDetails.filename}</h2>
            <div className="bg-[#E6EDFF] border-2 border-[#E6EDFF] flex flex-row justify-between rounded-lg px-4 min-w-56 max-w-64">
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="text-sm">{fileDetails.totalRows}</p>
                <p className="ml-3 text-sm"> Rows</p>
              </div>
              <p className="border-[1px] border-gray-700" />
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="text-sm">{fileDetails.totalColumns}</p>
                <p className="ml-3 text-sm"> Columns</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Button
            children={"Download"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="outline"
            startContent={<DownloadIcon />}
            onClick={handleDownLoadFile}
            className="mr-2"
          />
          <Button
            children={"Visualize"}
            size="medium"
            radius="2xl"
            isLoading={isLoadingVisualize}
            color="primary"
            onClick={handleVisualizeClick}
            startContent={<V />}
            isDisabled={selectedColumns.length === 0 || isLoadingVisualize}
            className=" border-blue-500"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between items-center border-t-2 border-[#443DFF]">
        <div
          className="flex justify-between items-center gap-x-4 my-4"
          style={{ width: "60%" }}
        >
          <Input
            type="text"
            label=""
            placeholder="What do you want to do with your data"
            defaultValue=""
            size="md"
            color="secondary"
            variant="bordered"
            radius="2xl"
            labelPlacement="outside"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
            className="max-w-input w-full"
          />
          <Button
            size="medium"
            radius="2xl"
            isLoading={false}
            color="none"
            isIconOnly={true}
            startContent={<CiFilter className="w-6 h-6" />}
            className="border-2 border-[#E6EDFF]"
            onClick={handleFilterClick}
          />
        </div>
        <div>
          <Button
            children={"Delete"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="danger"
            startContent={<DeleteIcon />}
          />
        </div>
      </div>

      <div className="">
        <div className="responsive-table-height">
          <Table
            headers={tableData.headers.filter((header) =>
              visibleHeaders.has(header)
            )}
            data={tableData.data}
            metadata={metadata}
            isCheckBox={true}
            isEditCell={false}
            isSelectColumn={true}
            onColumnSelect={handleColumnSelection}
            isFullHeight={true}
            showChart={true}
            onChartSelect={handleChartSelect}
          />
        </div>
      </div>

      {/* Analysis sidebar */}
      {selectedAnalysis && (
        <Analysis
          selectedData={{
            ...(selectedAnalysis as ChartSelectionData), // Assert the type explicitly
            name: selectedAnalysis.name || "Default Name", // Provide fallback value
          }}
          onClose={() => setSelectedAnalysis(null)}
          metadata={metadata}
        />
      )}

      {showRightSide && (
        <RightSide
          chartData={chartData}
          selectedColumns={selectedColumns}
          onSelectChart={handleChartTypeChange}
          onClose={handleCloseRightSide}
        />
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[400px] rounded-lg shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">Visibility Configuration</h3>
            <p className="my-3">
              This blog post has been published. Team members will be able to
              edit this post and republish changes.
            </p>
            <div className="grid grid-cols-1 gap-4 h-[300px] overflow-auto">
              {tableData.headers.map((header) => (
                <label key={header} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={visibleHeaders.has(header)}
                    onChange={() => handleCheckboxChange(header)}
                  />
                  <span>{header}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <Button
                children={"Close"}
                size="small"
                radius="xl"
                onClick={handleFilterClick}
                className="border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalScreen;
