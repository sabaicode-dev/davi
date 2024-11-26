import React, { useEffect, useState } from "react";
import Table from "./Table";

interface ApiResponse {
  count: number;
  next: boolean;
  previous: boolean;
  pages: number[];
  results: any[];
  headers: string[];
  file: string;
  filename: string;
  total: number;
}

interface TableProps {
  headers: string[];
  data: any[];
}

const TableProject: React.FC = () => {
  const [tableData, setTableData] = useState<TableProps>({
    headers: [],
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/project/674569eb024769d8a9f73968/file/674569f7024769d8a9f73969/details/"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData: ApiResponse = await response.json();

      setTableData({
        headers: jsonData.headers,
        data: jsonData.results,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

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
