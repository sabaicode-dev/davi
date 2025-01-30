import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "@/public/images/step/step4_pic.png";
import {
  CheckTick,
  FileIcon,
  UploadFile,
} from "@/src/components/atoms/icons/Icon";
import axios, { AxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";


const MAX_FILENAME_LENGTH = 30;

const UploadCsv: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [fileId, setFileId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState<boolean>(false);


  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!projectId) {
      setError("No project ID available. Please try again.");
      return;
    }

    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setFileName(file.name);
      setFileSize(file.size / 1024);
      await uploadFileToDB(file);
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false); // Reset drag-over state

    const file = event.dataTransfer.files[0];
    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!projectId) {
      setError("No project ID available. Please try again.");
      return;
    }

    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      setFileName(file.name);
      setFileSize(file.size / 1024);
      await uploadFileToDB(file);
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true); // Set drag-over state to true to highlight the drop area
  };

  const handleDragLeave = () => {
    setIsDragOver(false); // Reset drag-over state when dragging leaves the area
  };

  const uploadFileToDB = async (file: File) => {
    if (!projectId) {
      setError("Project ID is missing.");
      return;
    }

    setError("");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("filename", file.name);
      formData.append("size", file.size.toString());
      formData.append("type", "csv");
      formData.append("project_id", projectId);

      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total ?? 1;
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / total
          );
          setProgress(percentCompleted);
        },
      };

      const response = await axios.post(
        `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/`,
        formData,
        config
      );


      if (response.status === 201 || response.status === 200) {
        console.log('hello', response.data.data)
        const uploadedFileId = response.data.data?._id;
        const metadataId = response.data.data?.metadata_id;

        if (uploadedFileId) {
          setUploadSuccess(true);
          setFileId(uploadedFileId);
        }

        if (metadataId) {
          localStorage.setItem("metadataId", metadataId); // Save to localStorage
        }

      } else {
        setError("Failed to upload file. Please try again.");
      }
    } catch (error) {
      setError("Failed to upload file. Please try again.");
    }
  };


  const truncateFileName = (name: string) => {
    const extension = name.split(".").pop();
    const baseName = name.substring(0, name.lastIndexOf("."));
    if (baseName.length > MAX_FILENAME_LENGTH) {
      return baseName.substring(0, MAX_FILENAME_LENGTH) + `...${extension}`;
    }
    return name;
  };

  const handleBack = () => {
    navigate(`/projects/${projectId}/data-sources`);
  };

  const handleNext = () => {
    if (uploadSuccess && fileId) {
      window.location.href = `/projects/${projectId}/files/${fileId}/cleaning`;
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-full">
        <div className="flex w-full max-w-4xl p-10 space-x-16">
          <div className="w-1/2 flex items-center justify-center">
            <img src={Logo} alt="Illustration" className="w-full h-auto" />
          </div>
          <div className="w-1/2 pt-11 flex flex-col">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Upload and Attach Files
            </h2>
            <p className="text-sm text-gray-600 mb-10">
              Upload and attach files to this project.
            </p>
            <div
              className={`border-2 border-dashed ${isDragOver ? "border-blue-500" : "border-[#E4E7EC]"
                } bg-[#FFFFFF] p-3 rounded-lg text-center cursor-pointer shadow-sm`}
              onClick={handleFileUpload}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex justify-center items-center mb-3">
                <div className="bg-gray-50 p-2 rounded-full">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <UploadFile />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">
                  <span className="text-[#6941C6] font-semibold">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
              </div>
              <p className="text-xs text-gray-400">Support CSV</p>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {fileName && (
              <div className="flex justify-center items-center p-2 mt-6 border-[1.5px] border-[#7F56D9] rounded-lg space-x-6">
                <div className="bg-[#F9F5FF] p-2 rounded-full">
                  <div className="bg-[#F4EBFF] p-2 rounded-full">
                    <FileIcon />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-row justify-between items-center space-x-4">
                      <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                        {truncateFileName(fileName)}{" "}
                      </p>
                      {progress === 100 && <CheckTick />}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {fileSize.toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex flex-row justify-center items-center mt-1 space-x-4 w-full">
                    <div className="h-2 w-full bg-blue-300 rounded-full">
                      <div
                        className="h-2 bg-[#443DFF] rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium text-blue-600">
                      {progress}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && <p className="mt-2 text-red-600">{error}</p>}

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={handleBack}
                className="px-4 py-2 text-black bg-transparent border-[1.5px] border-[#E6EDFF] rounded-md font-semibold hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className={`px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 ${!uploadSuccess ? "cursor-not-allowed opacity-50" : ""
                  }`}
                disabled={!uploadSuccess}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCsv;
