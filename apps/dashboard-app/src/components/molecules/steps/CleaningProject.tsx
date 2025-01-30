import React, { useCallback, useEffect, useState } from "react";
import icon from "@/public/images/icon-cleaning.png";
import Button from "@/src/components/atoms/Button";
import { DeleteIcon, DownloadIcon } from "@/src/components/atoms/icons/Icon";
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

const CleaningProject: React.FC = () => {
  const navigate = useNavigate();
  const { projectId, fileId } = useParams();

  const [isShowCleaningModalOpen, setIsShowCleaningModalOpen] = useState(false);
  const [isPreviewCleaningModalOpen, setIsPreviewCleaningModalOpen] =
    useState(false);
  const [isAutoCleaningModalOpen, setIsAutoCleaningModalOpen] = useState(false);
  const [tableData, setTableData] = useState<TableProps>({
    headers: [],
    data: [],
  });

  // SUMMARY ACCURACY DATA
  const [fileDetails, setFileDetails] = useState({
    filename: "Employee Survey.CSV",
    totalRows: 0,
    totalColumns: 0,
  });
  const [metadataId, setMetadataId] = useState<string | null>(null);

  const [dataIssues, setDataIssues] = useState({
    outlierValues: 0,
    missingRows: 0,
    duplicateRows: 0,
  });

  // ACTUAL DATA FETCHING STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetchMore, setIsFetchMore] = useState(false); // USED FOR FETCH NEXT DATA IN TABLE
  const [isLoading, setIsLoading] = useState(false); // USED FOR FETCH INITIAL DATA (SHOW SPINNER)
  const [error, setError] = useState<string | null>(null);

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
    setIsShowCleaningModalOpen(false);
  };

  const handleOpenAutoCleaningModal = () => {
    setIsShowCleaningModalOpen(false);
    setIsAutoCleaningModalOpen(true);
  };

  const handleCloseAutoCleaningModal = () => {
    setIsAutoCleaningModalOpen(false);
  };

  const handleNextClick = () => {
    if (!metadataId || !fileId || !projectId) {
      console.error(
        "Missing required parameters (metadataId, fileId, or projectId)."
      );
      return;
    }

    navigate(`/projects/${projectId}/files/${fileId}/finalscreen`, {
      state: { metadataId },
    });
  };

  const HandleDownLoadFile = async () => {
    try {
      const res = await axios.get(
        `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/${fileId}/download/`,
        {
          responseType: "blob",
        }
      );
      console.log(res);
      const data = res.data as Blob;
      download(data, fileDetails.filename);
      console.log("Downloaded");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error Download file:", error);
    }
  };

  const fetchDataIssues = async () => {
    if (!projectId || !fileId) {
      setError("Project ID or File ID is missing");
      return;
    }

    try {
      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/${fileId}/accuracy/summary/`,
        method: "GET",
      });

      if (response.success) {
        setDataIssues({
          outlierValues: response.data.outliers_count || 0,
          missingRows: response.data.missing_rows_count || 0,
          duplicateRows: response.data.duplicate_rows_count || 0,
        });
      } else {
        setError(response.message || "Failed to fetch data issues");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while fetching data issues";
      setError(errorMessage);
    }
  };

  const fetchData = async (page = 1, append = false) => {
    if (!projectId || !fileId) {
      setError("Project ID or File ID is missing");
      setIsLoading(false);
      return;
    }

    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsFetchMore(true);
      }
      setError(null);

      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/${fileId}/?p=${page}`,
        method: "GET",
      });

      if (response.success) {
        const jsonData: ApiResponse = response.data;

        setTableData(prevData => ({
          headers: jsonData.headers,
          data: append ? [...prevData.data, ...jsonData.results] : jsonData.results,
          total_rows: jsonData.dataset_summary?.total_rows,
          total_column: jsonData.dataset_summary?.total_columns,
          filename: jsonData.filename,
        }));

        setFileDetails({
          filename: jsonData.filename,
          totalRows: jsonData.dataset_summary?.total_rows || 0,
          totalColumns: jsonData.dataset_summary?.total_columns || 0,
        });

        setHasMore(jsonData.next);
        setCurrentPage(page);
      } else {
        setError(response.message || "Failed to fetch data");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
      setIsFetchMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchData(currentPage + 1, true);
    }
  }, [currentPage, hasMore, isFetchMore]);

  useEffect(() => {
    const storedMetadataId = localStorage.getItem("metadataId");
    if (storedMetadataId) {
      setMetadataId(storedMetadataId);
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([
        fetchData(1),
        fetchDataIssues()
      ]);
    };

    initializeData();
  }, [projectId, fileId]);


  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="h-[calc(100vh-5rem)] w-full flex flex-col mt-8">
      {/* Header Section */}
      <div className="flex-none">
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
        <div className="border-t-2 border-[#443DFF]"></div>
      </div>

      {/* Table Section - Fills remaining space */}
      <div className="flex-1 overflow-hidden mt-4 flex flex-col">
        <div className="flex-1 min-h-0">
          <Table
            headers={tableData.headers}
            data={tableData.data}
            isCheckBox={true}
            isEditCell={false}
            isSelectColumn={true}
            onScrollEnd={loadMore}
            isLoading={isFetchMore}
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex-none mt-4 relative h-14">
        <Button
          children={"Transform"}
          size="medium"
          radius="2xl"
          isLoading={false}
          color="outline"
          className="absolute right-[90px] bottom-0"
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
          isDisabled={!metadataId}
        />
      </div>

      {/* Modals */}
      <ShowCleaningModal
        isOpen={isShowCleaningModalOpen}
        onClose={handleCloseShowCleaningModal}
        title="Data Transformation"
        onPreview={handleOpenPreviewCleaningModal}
        dataIssues={dataIssues}
        isDataIssuesLoading={isLoading}
        dataIssuesError={error}
        onAutoClean={handleOpenAutoCleaningModal}
      />
      <PreviewCleaningModal
        isOpen={isPreviewCleaningModalOpen}
        onClose={handleClosePreviewCleaningModal}
        projectId={projectId!}
        fileId={fileId!}
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
  );
};

export default CleaningProject;