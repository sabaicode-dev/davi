import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ViewTable from "../molecules/tables/ViewTable";
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
interface ShowTableProps {
  selectedItemId: number | null;
}
interface TableProps {
  headers: string[];
  data: any[];
  total_rows?: number;
  total_column?: number;
  filename?: string;
}
const ShowTable = ({ selectedItemId }: ShowTableProps) => {
  // const [searchParams] = useSearchParams();
  // const projectId = searchParams.get("projectId");
  const { projectId } = useParams();
  // console.log("S:S::S:::::::::::::::::", projectId);
  const [data, setData] = useState<TableProps>({
    headers: [],
    data: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const api = `http://127.0.0.1:8000/api/v1/project/${projectId}/scrape/view-dataset/${selectedItemId}`;
      const response = await axios.get(api);

      // Assuming the response contains 'headers' and 'data'
      // console.log("Console data response", response.data);
      const jsonData: ApiResponse = response.data;
      setData({
        headers: jsonData.headers,
        data: jsonData.results,
        total_rows: jsonData.dataset_summary?.total_rows,
        total_column: jsonData.dataset_summary?.total_columns,
        filename: jsonData.filename,
      });
    } catch (error) {
      setError("This file doesn't have data. Please try another csv.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedItemId === null) return; // Don't fetch if no ID is selected
    fetchData();
  }, [selectedItemId, projectId]);
  // console.log("selectedItemId in showTable:::::::::::", selectedItemId);
  return (
    <div className="w-full ml-5 border border-[#C4C1D8] rounded-lg">
      <div className="p-5 h-[700px] overflow-hidden">
        <header className="font-medium text-[18px] mb-4">
          {selectedItemId !== null ? (
            <div>{selectedItemId}</div>
          ) : (
            "No Table Selected"
          )}
        </header>
        <div className="h-full text-[#BDBBCB]">
          {loading ? (
            <div className="flex justify-center items-center text-center h-full text-xl	">
              Loading...
            </div>
          ) : error ? (
            <div className="flex justify-center items-center text-center h-full text-xl">
              {error}
            </div>
          ) : selectedItemId !== null ? (
            <ViewTable data={data.data} headers={data.headers} />
          ) : (
            <p className="flex justify-center items-center text-center h-full text-xl">
              No Table selected for preview
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowTable;
