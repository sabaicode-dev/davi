import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "../molecules/tables/Table";

interface ShowTableProps {
  selectedTable: string | null;
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
const ShowTable = ({ selectedTable }: ShowTableProps) => {
  const [fileDetails, setFileDetails] = useState({
    filename: "Employee Survey.CSV",
    totalRows: 0,
    totalColumns: 0,
  });
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
  const { projectId, fileId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!projectId || !fileId) {
      setError("Project ID or File ID is missing");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/api/v1/projects/`);
      console.log("res :::::::::::::::::::", response.json());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData: ApiResponse = await response.json();
      setTableData({
        headers: jsonData.headers,
        data: jsonData.results,
        total_rows: jsonData.dataset_summary?.total_rows,
        total_column: jsonData.dataset_summary?.total_columns,
        filename: jsonData.filename,
      });

      if (handleFileDetailsUpdate) {
        handleFileDetailsUpdate({
          filename: jsonData.filename || "",
          totalRows: jsonData.dataset_summary?.total_rows || 0,
          totalColumns: jsonData.dataset_summary?.total_columns || 0,
        });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [projectId, fileId]);
  return (
    <div className="w-full ml-5 border border-[#C4C1D8] rounded-lg">
      <div className="p-5 h-[800px] overflow-hidden">
        <header className="font-medium text-[18px] mb-4">
          {selectedTable ? (
            <Table
              headers={tableData.headers}
              data={tableData.data}
              isCheckBox={true}
              isEditCell={false}
              isSelectColumn={true}
            />
          ) : (
            "No Table Selected"
          )}
        </header>
        <div className="flex justify-center items-center text-center h-full text-[#BDBBCB]">
          {selectedTable ? `` : "No item selected for preview"}
        </div>
      </div>
    </div>
  );
};

export default ShowTable;
