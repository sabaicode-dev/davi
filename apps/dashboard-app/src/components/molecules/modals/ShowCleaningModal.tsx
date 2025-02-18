import { TranfromIcon } from "../../atoms/icons/Icon";
import { CircleAlert, X } from "lucide-react";
import Spinner from "../loading/Spinner";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  onPreview?: () => void;
  isDataIssuesLoading?: boolean;
  dataIssuesError?: string | null;
  dataIssues: {
    outlierValues: number;
    missingRows: number;
    duplicateRows: number;
  };
  onAutoClean?: () => void;
}

export function ShowCleaningModal({
  isOpen,
  onClose,
  title,
  onPreview,
  dataIssues,
  isDataIssuesLoading,
  dataIssuesError,
  onAutoClean,
}: ModalProps) {
  const handlePreview = () => {
    if (onPreview) {
      onPreview();
    }
  };

  const handleAutoClean = () => {
    if (onAutoClean) {
      onAutoClean();
    }
  };

  if (!isOpen) return null;

  if (isDataIssuesLoading) {
    return <Spinner />;
  }

  if (dataIssuesError) {
    return <div className="text-red-500">{dataIssuesError}</div>;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-48 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md">
        {/* Head - modal */}
        <div className="flex items-center justify-between pr-6 pt-2 pl-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg">
              <TranfromIcon />
            </div>
            <div className="">
              <h2 className="text-lg font-semibold pt-3">{title}</h2>
              <h1 className="text-gray-600 mb-4">
                After running the transformation, we found the following data
                issues.
              </h1>
            </div>
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

        {/* Body - modal */}
        <div className="px-20 py-2 space-y-3">
          {/* Outlier Values */}
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg flex items-center gap-2">
              Outlier Values:
              <div className="relative group">
                <CircleAlert className="w-4 h-4 text-green-500 cursor-pointer" />
                <div className="absolute bg-white text-gray-600 text-xs font-medium rounded border shadow-md py-1 px-4 right-1/2 translate-x-1/2 bottom-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[220px] translate-y-[-8px]">
                  An outlier value is a data point in a dataset that differs
                  significantly from other observations.
                  <svg
                    className="absolute text-gray-100 h-2 w-full left-1/2 -translate-x-1/2 top-full"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
            </h2>
            <p className="font-bold">{dataIssues.outlierValues}</p>
          </div>

          {/* missing row */}
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg">Total number of missing rows:</h2>
            <p className="font-bold">{dataIssues.missingRows}</p>
          </div>
          {/* duplicate row */}
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg">Total number of duplicate rows:</h2>
            <p className="font-bold">{dataIssues.duplicateRows}</p>
          </div>
        </div>

        {/* Footer - modal */}
        <div className="flex justify-end space-x-3 py-6 px-6">
          <button
            onClick={handlePreview}
            className="px-6 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors rounded-[10px]"
          >
            Preview
          </button>
          <button
            onClick={handleAutoClean}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-[10px]"
          >
            Auto Clean
          </button>
        </div>
      </div>
    </div>
  );
}
