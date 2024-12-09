import { X } from "lucide-react";
import Table from "../tables/Table";
import { useMemo } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  projectId: string;
  fileId: string;
  missingRowsData: any[];
  dataIssuesDetails?: {
    missingRows: any[];
    duplicateRows: any[];
    outliers: any;
  };
}

export function PreviewCleaningModal({
  isOpen,
  onClose,
  title,
  projectId,
  fileId,
  missingRowsData,
  dataIssuesDetails,
}: ModalProps) {
  const combinedIssuesData = useMemo(() => {
    const missingRowsList = (dataIssuesDetails?.missingRows || []).map(
      (row) => ({
        ...row,
        issueType: "Missing Row",
      })
    );

    const duplicateRowsList = (dataIssuesDetails?.duplicateRows || []).map(
      (row) => ({
        ...row,
        issueType: "Duplicate Row",
      })
    );

    // Handle outliers - this might need adaptation based on your exact outlier structure
    const outliersList = Object.entries(dataIssuesDetails?.outliers || {}).map(
      ([key, value]) => ({
        column: key,
        outlierValue: value,
        issueType: "Outlier",
      })
    );

    return [...missingRowsList, ...duplicateRowsList, ...outliersList];
  }, [dataIssuesDetails]);

  // Dynamically generate headers
  const tableHeaders = useMemo(() => {
    // Start with a fixed 'Issue Type' column
    const baseHeaders = ["issueType"];

    // Collect all unique keys from the combined data
    const dynamicHeaders = combinedIssuesData.reduce((acc, row) => {
      Object.keys(row).forEach((key) => {
        if (!acc.includes(key)) {
          acc.push(key);
        }
      });
      return acc;
    }, baseHeaders);

    return dynamicHeaders;
  }, [combinedIssuesData]);

  const handlePreview = () => {
    alert("Preview functionality to be implemented");
  };

  const handleComfirm = () => {
    alert("Confirm - Coming soon!!! ")
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-55 flex items-start justify-center z-50 w-full pt-48">
      {/* <div className="flex flex-col bg-red-200 rounded-2xl w-[1000px] max-w-md"> */}
      <div className="flex flex-col space-y-3  bg-white rounded-2xl w-full md:w-[600px] lg:w-[800px] xl:w-[1200px] 2xl:w-[1600px] shadow-2xl">
        {/* Head - modal */}
        <div className="flex items-center justify-between pr-6 pt-2 pl-3">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold p-3">Input field Empty</h2>
          </div>
          <div className="justify-start items-start">
            <button
              onClick={onClose}
              className="flex text-gray-500 hover:text-gray-700 transition-colors justify-center items-center w-8 h-8 bg-gray-100 hover:bg-gray-200 duration-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex w-full justify-end items-end px-6">
          <button
            onClick={() => alert("Coming soon!!!")}
            className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-[10px]"
          >
            Delete
          </button>
        </div>
        {/* Body - modal */}
        <div className="text-center mx-7 h-[300px] lg:h-[350px] xl:h-[500px] 2xl:h-[600px] py-2">
          <Table
            headers={tableHeaders}
            data={combinedIssuesData}
            isCheckBox={true}
            isEditCell={true}
            isSelectColumn={true}
          />
        </div>
        {/* Footer - modal */}
        <div className="flex justify-end space-x-3 pb-6 px-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors rounded-[10px]"
          >
            Cancel
          </button>
          <button
            onClick={handleComfirm}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-[10px]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
