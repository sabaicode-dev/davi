import React, { useEffect, useState } from "react";
import icon from "@/public/images/icon-cleaning.png";
import Button from "@/src/components/atoms/Button";
import { DeleteIcon, DownloadIcon, V } from "@/src/components/atoms/icons/Icon";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@/src/components/molecules/tables/Table";
import Spinner from "@/src/components/molecules/loading/Spinner";
import { ShowCleaningModal } from "../modals/ShowCleaningModal";
import request from "@/src/utils/helper";
import { PreviewCleaningModal } from "../modals/PreviewCleaningModal";
import { AutoCleaningModal } from "../modals/AutoCleaningModal";
import axios from "axios";
import download from "downloadjs";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
// Prop descripe the data response from api
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

// Prop descript the behavior of table
interface TableProps {
  headers: string[];
  data: any[];
  total_rows?: number;
  total_column?: number;
  filename?: string;
}
// Define Cleaning project page
const CleaningProject: React.FC = () => {
  const [fileDetails, setFileDetails] = useState({
    filename: "Employee Survey.CSV",
    totalRows: 0,
    totalColumns: 0,
  });

  const navigate = useNavigate();

  const [isShowCleaningModalOpen, setIsShowCleaningModalOpen] = useState(false);
  const [isPreviewCleaningModalOpen, setIsPreviewCleaningModalOpen] =
    useState(false);
  const [isAutoCleaningModalOpen, setIsAutoCleaningModalOpen] = useState(false);
  const handleOpenShowCleaningModal = () => {
    setIsShowCleaningModalOpen(true);
  };

  const handleCloseShowCleaningModal = () => {
    setIsShowCleaningModalOpen(false);
  };

  const handleOpenPreviewCleaningModal = () => {
    setIsShowCleaningModalOpen(false);
    setIsPreviewCleaningModalOpen(true);
  };

  const handleClosePreviewCleaningModal = () => {
    setIsPreviewCleaningModalOpen(false);
    // Optionally reopen ShowCleaningModal
    setIsShowCleaningModalOpen(false);
  };
  const handleOpenAutoCleaningModal = () => {
    setIsShowCleaningModalOpen(false);
    setIsAutoCleaningModalOpen(true);
  };
  const handleCloseAutoCleaningModal = () => {
    setIsAutoCleaningModalOpen(false);
  };
  const [tableData, setTableData] = useState<TableProps>({
    headers: [],
    data: [],
  });
  const handleFileDetailsUpdate = (details: {
    filename: string;
    totalRows: number;
    totalColumns: number;
  }) => {
    setFileDetails(details);
  };

  const handleNextClick = () => {
    if (!metadataId || !fileId || !projectId) {
      console.error(
        "Missing required parameters (metadataId, fileId, or projectId)."
      );
      return;
    }

    console.log("Navigating to FinalScreen with metadataId:", metadataId);
    navigate(`/project/${projectId}/file/${fileId}/finalscreen`, {
      state: { metadataId }, // Pass metadataId in navigation state
    });
  };

  const { projectId, fileId } = useParams();
  const [metadataId, setMetadataId] = useState<string | null>(null);
  const [metadata, setMetadata] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataIssuesDetails, setDataIssuesDetails] = useState({
    missingRows: [],
    duplicateRows: [],
    outliers: {},
  });

  const [filename, setFilename] = useState<string | undefined>();
  // Handle useEffect to fetch data to table before take it to cleaning.

  useEffect(() => {
    fetchData();
  }, [projectId, fileId]);
  
  const fetchData = async () => {
    if (!projectId || !fileId) {
      setError("Project ID or File ID is missing");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/project/${projectId}/file/${fileId}/details/`,
        method: "GET",
      });

      if (response.success) {
        const jsonData: ApiResponse = response.data;

        // Existing logic for setting table data and filename
        setTableData({
          headers: jsonData.headers,
          data: jsonData.results,
          total_rows: jsonData.dataset_summary?.total_rows,
          total_column: jsonData.dataset_summary?.total_columns,
          filename: jsonData.filename,
        });

        // Update file details
        setFileDetails({
          filename: jsonData.filename,
          totalRows: jsonData.dataset_summary?.total_rows || 0,
          totalColumns: jsonData.dataset_summary?.total_columns || 0,
        });
      } else {
        setError(response.message || "Failed to fetch data");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Retrieve metadataId from localStorage
    const storedMetadataId = localStorage.getItem("metadataId");
    if (storedMetadataId) {
      console.log("Retrieved metadataId from localStorage:", storedMetadataId);
      setMetadataId(storedMetadataId);
      fetchMetadata(storedMetadataId);
    } else {
      console.error("No metadataId found in localStorage.");
    }
  }, []);

  const fetchMetadata = async (metadataId: string) => {
    try {
      console.log("Fetching metadata for metadataId:", metadataId);
      const response = await fetch(
        `${API_ENDPOINTS.API_URL}/metadata/${metadataId}/`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch metadata. Status: ${response.status}`);
      }

      const metadata = await response.json();
      console.log("Metadata fetched successfully:", metadata);
      setMetadata(metadata);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      setMetadata(null);
    }
  };

  const HandleDownLoadFile = async () => {
    try {
      const res = await axios.get(
        `${API_ENDPOINTS.API_URL}/project/${projectId}/file/download/${filename}/`,
        {
          responseType: "blob",
          onDownloadProgress: (ProgressEvent) => {
            console.log(
              "Download Progress: " +
                Math.round(ProgressEvent.loaded / (ProgressEvent.total ?? 1)) *
                  100
            ) + "%";
          },
        }
      );
      console.log(res);
      const data = res.data as Blob;
      download(data, filename);
      console.log("Downloaded");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error Download file:", error);
    }
  };
  const [dataIssues, setDataIssues] = useState({
    outlierValues: 0,
    missingRows: 0,
    duplicateRows: 0,
  });
  const [isDataIssuesLoading, setIsDataIssuesLoading] = useState(false);
  const [dataIssuesError, setDataIssuesError] = useState<string | null>(null);
  const [missingRowsData, setMissingRowsData] = useState<
    {
      name: string;
      main_category: string;
      ratings: string;
      actual_price: string;
    }[]
  >([]);

  const fetchDataIssues = async () => {
    if (!projectId || !fileId) {
      setDataIssuesError("Project ID or File ID is missing");
      return;
    }

    try {
      setIsDataIssuesLoading(true);
      setDataIssuesError(null);

      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/project/${projectId}/file/${fileId}/find-anaccurate-file/`,
        method: "POST",
      });

      if (response.success) {
        setDataIssues({
          outlierValues: response.data.outliers_count || 0,
          missingRows: response.data.missing_rows_count || 0,
          duplicateRows: response.data.duplicate_rows_count || 0,
        });
        setDataIssuesDetails({
          missingRows: response.data.missing_rows || [],
          duplicateRows: response.data.duplicate_rows || [],
          outliers: response.data.outliers || {},
        });
        // Optional: Log data issues for debugging
        console.log("Data Issues:", {
          missingRows: response.data.missing_rows_count,
          outlierValues: response.data.outliers_count,
          duplicateRows: response.data.duplicate_rows_count,
        });
        setMissingRowsData(response.data.missing_rows);
        console.log("Missing value: ", response.data.missing_rows);
      } else {
        setDataIssuesError(response.message || "Failed to fetch data issues");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching data issues";
      setDataIssuesError(errorMessage);
      console.error("Data Issues Fetch Error:", err);
    } finally {
      setIsDataIssuesLoading(false);
    }
  };

  // You can call this method when needed, for example:
  useEffect(() => {
    fetchData();
    fetchDataIssues();
  }, [projectId, fileId]);

  // Handle loading with spiner
  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Spinner />
      </div>
    );

  // Handle if it error/issue
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div
      className="flex flex-col overflow-hidden mt-8 h-[200px]"
      style={{ width: "100%", height: "30%" }}
    >
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Content Left */}
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
        {/* Content Right */}
        <div className="flex items-center">
          <Button
            children={"Delete"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="danger"
            startContent={<DeleteIcon />}
            className="mr-2"
          />
          <Button
            children={"Download"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="outline"
            startContent={<DownloadIcon />}
            onClick={() => HandleDownLoadFile()}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center border-t-2 border-[#443DFF]"></div>
      <div className="mt-4">
        <div className="responsive-table-height">
          <Table
            headers={tableData.headers}
            data={tableData.data}
            isCheckBox={true}
            isEditCell={false}
            isSelectColumn={true}
          />
        </div>
        <div className="relative mt-14">
          {/* Positioning the buttons */}
          <Button
            children={"Transform"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="outline"
            className="absolute right-0 bottom-0 mr-[90px]"
            onClick={handleOpenShowCleaningModal}
          />
          <Button
            children={"Next"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="primary"
            className="absolute right-0 bottom-0 border-blue-500 w-20"
            onClick={handleNextClick}
            isDisabled={!metadataId} // Disable if metadataId is not available
          />
        </div>
        {/* Modal - Show Cleaning */}
        <ShowCleaningModal
          isOpen={isShowCleaningModalOpen}
          onClose={handleCloseShowCleaningModal}
          title="Data Transformation"
          onPreview={handleOpenPreviewCleaningModal}
          dataIssues={dataIssues}
          isDataIssuesLoading={isDataIssuesLoading}
          dataIssuesError={dataIssuesError}
          onAutoClean={handleOpenAutoCleaningModal}
        />
        {/* Modal - Show Preview data */}

        <PreviewCleaningModal
          isOpen={isPreviewCleaningModalOpen}
          onClose={handleClosePreviewCleaningModal}
          title="Preview Cleaning"
          projectId={projectId!}
          fileId={fileId!}
          missingRowsData={missingRowsData}
          dataIssuesDetails={dataIssuesDetails}
        />
        <AutoCleaningModal
          isOpen={isAutoCleaningModalOpen}
          onClose={handleCloseAutoCleaningModal}
          title="Auto Cleaning"
          filename={fileDetails.filename}
          projectId={projectId!}
          fileId={fileId!}
        />
      </div>
    </div>
  );
};

export default CleaningProject;
