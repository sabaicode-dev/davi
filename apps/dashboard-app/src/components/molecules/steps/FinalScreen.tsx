import React, { useContext, useEffect, useState } from "react";
import icon from "@/public/images/icon-cleaning.png";
import Button from "../../atoms/Button";
import { DeleteIcon, DownloadIcon, V } from "../../atoms/icons/Icon";
import Input from "../../atoms/Input";
import { CiFilter } from "react-icons/ci";
import Table from "../tables/Table";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../loading/Spinner";

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

  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableProps>({
    headers: [],
    data: [],
  });

  const { projectId, fileId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Move handleFileDetailsUpdate before it's used
  const handleFileDetailsUpdate = (details: {
    filename: string;
    totalRows: number;
    totalColumns: number;
  }) => {
    setFileDetails(details);
  };

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
        `http://3.24.110.41:8000/api/v1/v1/project/${projectId}/file/${fileId}/details/`
      );

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

      // Ensure handleFileDetailsUpdate is called after it's defined
      handleFileDetailsUpdate({
        filename: jsonData.filename || "",
        totalRows: jsonData.dataset_summary?.total_rows || 0,
        totalColumns: jsonData.dataset_summary?.total_columns || 0,
      });
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
        <div>
          <Button
            children={"Download"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="outline"
            startContent={<DownloadIcon />}
            className="mr-2"
          />
          <Button
            children={"Visualize"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="primary"
            startContent={<V />}
            className=" border-blue-500"
          />
        </div>
      </div>
      <div className="flex flex-row  justify-between items-center border-t-2 border-[#443DFF] ">
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
        {/* <TableProject onFileDetailsUpdate={handleFileDetailsUpdate} /> */}
        <div className="responsive-table-height">
          <Table
            headers={tableData.headers}
            data={tableData.data}
            isCheckBox={true}
            isEditCell={false}
            isSelectColumn={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalScreen;
