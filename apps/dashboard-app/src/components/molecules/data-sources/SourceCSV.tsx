import React from "react";
import CSV from "@/public/images/step/CSV_logo.png";
import { useNavigate } from "react-router-dom";

interface SourceCSVProps {
  projectId?: string | null;
}

const SourceCSV: React.FC<SourceCSVProps> = ({ projectId }) => {
  const navigate = useNavigate();

  const goToUploadCsv = () => {
    if (!projectId) {
      console.error("No project ID available");
      return;
    }
    navigate(`/project/pick-datasource/upload-csv/${projectId}`);
  };
  return (
    <div
      onClick={goToUploadCsv}
      className="w-60 h-full mx-auto border rounded-lg"
    >
      <div className="bg-green-100 cursor-pointer hover:bg-green-200 h-32 px-6 py-3 flex items-center justify-center rounded-tl-lg rounded-tr-lg">
        {/* Reduced height and padding */}
        <img src={CSV} alt="CSV Icon" className="w-16" />
        {/* Reduced image size */}
      </div>
      <div className="flex justify-between items-center p-1">
        {/* Reduced padding */}
        <p className="text-gray-800 text-sm">Upload File</p>
        {/* Made font size smaller */}
        <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 px-1 py-0.5">
          CSV
        </button>
      </div>
    </div>
  );
};

export default SourceCSV;
