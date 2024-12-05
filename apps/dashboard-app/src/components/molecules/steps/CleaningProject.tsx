import React, { useEffect, useState } from "react";
import icon from "@/public/images/icon-cleaning.png";
import Button from "@/src/components/atoms/Button";
import { DeleteIcon, DownloadIcon } from "@/src/components/atoms/icons/Icon";
import { useNavigate, useParams } from "react-router-dom";
import Table from "@/src/components/molecules/tables/Table";
import Spinner from "@/src/components/molecules/loading/Spinner";

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
  const [fileDetails, setFileDetails] = useState({
    filename: "Employee Survey.CSV",
    totalRows: 0,
    totalColumns: 0,
  });

  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableProps>({
    headers: [],
    data: [],
  });
  const { projectId, fileId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle file details update
  const handleFileDetailsUpdate = (details: {
    filename: string;
    totalRows: number;
    totalColumns: number;
  }) => {
    setFileDetails(details);
  };

  // Navigate to the next page
  const handleNextClick = () => {
    try {
      console.log("Attempting to navigate");
      navigate(`/project/${projectId}/file/${fileId}/finalscreen`);
      console.log("Navigation successful");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  // Fetch data when component mounts or when params change
  useEffect(() => {
    if (projectId && fileId) {
      fetchData();
    } else {
      setError("Project ID or File ID is missing");
      setIsLoading(false);
    }
  }, [projectId, fileId]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://3.24.110.41:8000/api/v1/project/${projectId}/file/${fileId}/details/`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData: ApiResponse = await response.json();
      console.log("Fetched data:", jsonData);

      // Update state with fetched data
      setTableData({
        headers: jsonData.headers,
        data: jsonData.results,
        total_rows: jsonData.dataset_summary?.total_rows,
        total_column: jsonData.dataset_summary?.total_columns,
        filename: jsonData.filename,
      });

      // Update file details
      if (jsonData.dataset_summary) {
        handleFileDetailsUpdate({
          filename: jsonData.filename || "",
          totalRows: jsonData.dataset_summary.total_rows || 0,
          totalColumns: jsonData.dataset_summary.total_columns || 0,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner while data is being fetched
  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Spinner />
      </div>
    );

  // Show error message if there's an error
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
            
          />
        </div>
      </div>
      <div className="flex flex-row justify-end items-center py-2 border-t-2 border-[#443DFF]"></div>

      <div>
        <div className="responsive-table-height">
          <Table
            headers={tableData.headers}
            data={tableData.data}
            isCheckBox={true}
            isEditCell={false}
            isSelectColumn={true}
            isFullHeight={false}
            showChart={false}
          />
        </div>
        <div className="relative pt-5">
          {/* Positioning the buttons */}
          <Button
            children={"Transform"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="outline"
            className="absolute right-0 bottom-0 mr-[90px]"
          />
          <Button
            children={"Next"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="primary"
            className="absolute right-0 bottom-0 border-blue-500 w-20"
            onClick={handleNextClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CleaningProject;
