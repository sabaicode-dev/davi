import React, { useCallback, useEffect, useState } from "react";
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
  const [visibleHeaders, setVisibleHeaders] = useState<Set<string>>(new Set());
  const [metadata, setMetadata] = useState<any[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [showRightSide, setShowRightSide] = useState(false);
  const [chartData, setChartData] = useState<Array<{ chartType: string; img: string }>>([]);

  const [showPopup, setShowPopup] = useState(false);
  const { projectId, fileId } = useParams();
  const [isLoadingVisualize, setIsLoadingVisualize] = useState(false);

  // --- PAGINATION STATES ---
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);    // For the main fetch
  const [isFetchingMore, setIsFetchingMore] = useState(false); // For "load more" calls
  const [error, setError] = useState<string | null>(null);

  // If you have an existing metadataId from location or localStorage
  const location = useLocation();
  const metadataId = location.state?.metadataId || localStorage.getItem("metadataId");

  // For optional analysis panel
  const [selectedAnalysis, setSelectedAnalysis] = useState<{
    category: string;
    percentage: number;
    type: string;
    name: string;
  } | null>(null);

  // Fetch Table Data and Metadata
  const fetchData = async (page = 1, append = false) => {
    try {
      // Distinguish between the first load and subsequent "load more" calls
      if (page === 1) {
        setIsLoadingData(true);
      } else {
        setIsFetchingMore(true);
      }
      setError(null);

      // Example endpoint with pagination
      const endpoint = `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/${fileId}/?p=${page}`;
      const tableResponse = await fetch(endpoint);
      if (!tableResponse.ok) {
        throw new Error(`HTTP error! status: ${tableResponse.status}`);
      }

      const tableJsonData: ApiResponse = await tableResponse.json();

      // 2) Merge new data with old data if append == true
      const newData = append
        ? [...tableData.data, ...tableJsonData.results]
        : tableJsonData.results;

      // Update table data
      setTableData({
        headers: tableJsonData.headers,
        data: newData,
        total_rows: tableJsonData.dataset_summary?.total_rows,
        total_column: tableJsonData.dataset_summary?.total_columns,
        filename: tableJsonData.filename,
      });

      // Update file details
      if (tableJsonData.dataset_summary) {
        setFileDetails({
          filename: tableJsonData.filename || "",
          totalRows: tableJsonData.dataset_summary.total_rows || 0,
          totalColumns: tableJsonData.dataset_summary.total_columns || 0,
        });
      }

      // 3) Update "hasMore" based on tableJsonData.next
      //    (This depends on your backend—if next is boolean or a link)
      setHasMore(!!tableJsonData.next);

      // 4) Record current page
      setCurrentPage(page);

      // On first load, set visible headers if not already set
      if (page === 1 && tableJsonData.headers?.length) {
        setVisibleHeaders(new Set(tableJsonData.headers));
      }
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setIsLoadingData(false);
      setIsFetchingMore(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      // If you have a separate metadata endpoint
      const metadataResponse = await fetch(`${API_ENDPOINTS.API_URL}/metadata/${metadataId}/`);
      if (!metadataResponse.ok) {
        throw new Error(`Failed to fetch metadata. Status: ${metadataResponse.status}`);
      }
      const metadataJson = await metadataResponse.json();
      if (metadataJson.metadata) {
        setMetadata(metadataJson.metadata);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadMore = useCallback(() => {
    // Only fetch next page if not already loading/fetching and "hasMore" is true
    if (!isLoadingData && !isFetchingMore && hasMore) {
      fetchData(currentPage + 1, true);
    }
  }, [currentPage, hasMore, isLoadingData, isFetchingMore]);

  const handleChartSelect = (
    metadata: ChartMetadata | ChartMetadata[],
    chartData: ChartSelectionData
  ) => {
    // Ensure metadata is always treated as an array
    const metadataArray = Array.isArray(metadata) ? metadata : [metadata];

    // Find the matching metadata by key
    const matchedMetadata = metadataArray.find(
      (meta) => meta.key === chartData.category
    );

    if (matchedMetadata) {
      const updatedAnalysis = {
        name: matchedMetadata.name || "Default Name",
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

  const handleColumnSelection = (columns: string[]) => {
    if (JSON.stringify(selectedColumns) !== JSON.stringify(columns)) {
      setSelectedColumns(columns);
    }
  };

  const handleVisualizeClick = async () => {
    if (selectedColumns.length === 0 || !fileId) return;
    setIsLoadingVisualize(true);

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

        const response = await fetch(`${API_ENDPOINTS.API_URL}/charts`, {
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
      setIsLoadingVisualize(false);
    }
  };

  const handleCloseRightSide = () => {
    setShowRightSide(false);
    setChartData([]);
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
        `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/${fileId}/download/`,
        {
          responseType: "blob",
        }
      );

      // Validate response
      if (res.status !== 200) {
        throw new Error("Failed to download the file. Please try again.");
      }

      // Use downloadjs to trigger the file download
      download(res.data, fileDetails.filename, "application/octet-stream");

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

  useEffect(() => {
    if (!metadataId || !projectId || !fileId) {
      setError("Missing required parameters (metadataId, projectId, or fileId).");
      setIsLoadingData(false);
      return;
    }

    // Fetch table data page=1
    fetchData(1, false);

    // (Optional) fetch metadata in parallel
    fetchMetadata();
  }, [metadataId, projectId, fileId]);

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (isLoadingData)
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Spinner />
      </div>
    );

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
      {/* -- HEADER SECTION (fixed height) -- */}
      <div className="flex flex-col p-4">
        <div className="flex flex-row justify-between items-center mb-3">
          {/* Left side */}
          <div className="flex flex-row gap-x-3 items-center">
            <div className="flex rounded-full bg-[#F4EBFF] w-12 h-12 justify-center items-center">
              <img src={icon} alt="" className="w-5 h-6" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold mb-1">{fileDetails.filename}</h2>
              <div className="bg-[#E6EDFF] border-2 border-[#E6EDFF] flex flex-row justify-between rounded-lg px-4 min-w-56 max-w-64">
                <div className="flex flex-row min-w-20 max-w-28 px-2">
                  <p className="text-sm">{fileDetails.totalRows}</p>
                  <p className="ml-1 text-sm">Rows</p>
                </div>
                <p className="border-[1px] border-gray-700 mx-2" />
                <div className="flex flex-row min-w-20 max-w-28 px-2">
                  <p className="text-sm">{fileDetails.totalColumns}</p>
                  <p className="ml-1 text-sm">Columns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center">
            <Button
              children={"Download"}
              size="medium"
              radius="2xl"
              isLoading={false}
              color="outline"
              startContent={<DownloadIcon />}
              className="mr-2"
              onClick={handleDownLoadFile}
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
              className="border-blue-500 mr-2"
            />

            <div className="relative group flex flex-col items-center">
              <Button
                children={"Delete"}
                size="medium"
                radius="2xl"
                isLoading={false}
                color="danger"
                startContent={<DeleteIcon />}
                className="cursor-not-allowed text-gray-400 relative"
                aria-disabled="true"
                disabled={true}
              />
              {/* Tooltip (Now Positioned Below the Button) */}
              <div className="absolute bottom-[-3.2rem] bg-black text-white text-xs font-bold px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Feature Coming Soon
              </div>
            </div>
          </div>

        </div>
        {/* Some bottom border or second row */}
        <div className="flex flex-row items-center gap-2">
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
      </div>

      {/* -- MAIN CONTENT (flex-1 = remaining space) -- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0">
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
            isFullHeight={false}
            showChart={true}
            onChartSelect={handleChartSelect}
            onScrollEnd={loadMore}
            isLoading={isFetchingMore}
          />
        </div>
      </div>

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
