// src/components/UploadCsv.tsx
import React, { useRef, useState } from "react";
import Logo from "@/public/images/step/step4_pic.png";
import {
  CheckTick,
  FileIcon,
  UploadFile,
} from "@/src/components/atoms/icons/Icon";
import request from "@/src/utils/helper";

interface StepTwoProps {
  onBack: () => void;
}

const UploadCsv: React.FC<StepTwoProps> = ({ onBack }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const MAX_FILENAME_LENGTH = 30;

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setFileName(file.name);
        setFileSize(file.size / 1024);
        setError("");
        simulateUpload();
        uploadFileToDB(file); // Call the global upload function
      } else {
        setError("Please upload a valid CSV file.");
      }
    } else {
      setError("No file selected.");
    }
  };

  // Global upload function
  const uploadFileToDB = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await request({
        url: "http://127.0.0.1:8000/api/v1/file-upload/",
        method: "POST",
        data: formData,
      });
      console.log("Upload response:", response);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  const simulateUpload = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 50);
  };

  const truncateFileName = (name: string) => {
    const extension = name.split(".").pop();
    const baseName = name.substring(0, name.lastIndexOf("."));
    if (baseName.length > MAX_FILENAME_LENGTH) {
      return baseName.substring(0, MAX_FILENAME_LENGTH) + `...${extension}`;
    }
    return name;
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
              className="border-2 border-dashed border-[#E4E7EC] bg-[#FFFFFF] p-3 rounded-lg text-center cursor-pointer shadow-sm"
              onClick={handleFileUpload}
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
                <div className="flex flex-col">
                  <div className="flex flex-col justify-start">
                    <div className="flex flex-row items-center space-x-4">
                      <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                        {truncateFileName(fileName)}{" "}
                      </p>
                      {progress === 100 && <CheckTick />}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {fileSize.toFixed(2)} KB
                    </p>
                  </div>
                  <div className="flex flex-row justify-center items-center mt-3 space-x-4">
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
                onClick={onBack}
                className="px-4 py-2 text-black bg-transparent border-[1.5px] border-[#E6EDFF] rounded-md font-semibold hover:bg-gray-300"
              >
                Back
              </button>
              <button
                onClick={() =>
                  fileName && console.log("Proceeding to next step...")
                }
                className={`px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 ${
                  !fileName ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!fileName}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-200 rounded-full mx-1"></div>
      </div>
    </div>
  );
};

export default UploadCsv;
