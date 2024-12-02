import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useParams } from "react-router-dom";
import Spinner from "../../loading/Spinner";

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

interface TableProjectProps {
  onFileDetailsUpdate?: (details: {
    filename: string;
    totalRows: number;
    totalColumns: number;
  }) => void;
}

const TableProject:React.FC <TableProjectProps> = ({ onFileDetailsUpdate }) => {
  const { projectId, fileId } = useParams();
  const [tableData, setTableData] = useState<TableProps>({
    headers: [],
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


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
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/project/${projectId}/file/${fileId}/details/`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData: ApiResponse = await response.json();
      console.log("Filename:", jsonData.filename);
      console.log("Total Rows:", jsonData.dataset_summary?.total_rows);
      console.log("Total Columns:", jsonData.dataset_summary?.total_columns);

      setTableData({
        headers: jsonData.headers,
        data: jsonData.results,
        total_rows: jsonData.dataset_summary?.total_rows,
        total_column: jsonData.dataset_summary?.total_columns,
        filename: jsonData.filename,
      });

      if (onFileDetailsUpdate) {
        onFileDetailsUpdate({
          filename: jsonData.filename || '',
          totalRows: jsonData.dataset_summary?.total_rows || 0,
          totalColumns: jsonData.dataset_summary?.total_columns || 0
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  



  if (isLoading)
    return (
      <div className="flex w-full justify-center items-center h-full">
        <Spinner />
      </div>
    );
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;


// Correct



  return (
    <div className="responsive-table-height">
      <Table
        headers={tableData.headers}
        data={tableData.data}
        isCheckBox={true}
        isEditCell={true}
        isSelectColumn={true}     
      />
    </div>
  );
};

export default TableProject;
