import React, { useState } from "react";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { TranfromIcon } from "../../atoms/icons/Icon";
import request from "@/src/utils/helper";
import { SuccessMessage } from "../alert-messages/SuccessMessage";
import { ErrorMessage } from "../alert-messages/ErrorMessage";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  filename?: string;
  projectId?: string;
  fileId?: string;
}

interface DataTransformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function AutoCleaningModal({
  isOpen,
  onClose,
  title,
  filename,
  projectId,
  fileId,
}: ModalProps) {
  if (!isOpen) return null;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    outlierValues: false,
    deleteDuplicateRow: false,
  });

  // Alert states
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const missingRowOptions = [
    { value: "delete_missing_row", label: "Delete Missing Row" },
    { value: "imputeByMean", label: "Impute By Mean" },
    { value: "imputeByMode", label: "Impute By Mode" },
  ];

  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    setCheckboxes((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAutoClean = async () => {
    // Validate input
    if (!selectedOption) {
      setShowError(true);
      return;
    }

    // Prepare process array based on selected options
    const processOptions = [selectedOption];
    if (checkboxes.deleteDuplicateRow) {
      processOptions.push("delete_duplicate_row");
    }

    // Prepare request body
    const requestBody = {
      filename: filename || "",
      process: processOptions,
    };

    try {
      setIsLoading(true);
      // Construct the URL dynamically using projectId and fileId
      const url = `${API_ENDPOINTS.API_URL}/project/${projectId}/file/${fileId}/processing-cleaning-file/`;

      const response = await request({
        url: url,
        method: "POST",
        data: requestBody,
      });

      // Handle successful response
      if (response.success) {
        setSuccessMessage(`Successfully cleaned file: ${filename}`);
      } else {
        // Handle unsuccessful response
        setErrorMessage(`Failed to clean file: ${response.message}`);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Auto cleaning error:", error);
      setErrorMessage(
        `Error cleaning file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-48 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md">
          <div className="flex items-center justify-between pr-6 pt-2 pl-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg">
                <TranfromIcon />
              </div>
              <div className="">
                <h2 className="text-lg font-semibold pt-3">{title}</h2>
                <h1 className="text-gray-600 mb-4">
                  After running the transformation, we found the following data
                  issues
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
          <div className="px-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <button
                  onClick={() => handleCheckboxChange("outlierValues")}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <div className="relative w-5 h-5">
                    <div
                      className={`absolute inset-0 ${
                        checkboxes.outlierValues
                          ? "bg-blue-600"
                          : "border-2 border-gray-300"
                      } rounded transition-colors`}
                    ></div>
                    {checkboxes.outlierValues && (
                      <Check className="absolute inset-0 w-5 h-5 text-white p-1" />
                    )}
                  </div>
                  <span className="text-gray-900 text-base">
                    Outlier Values
                  </span>
                </button>

                <button
                  onClick={() => handleCheckboxChange("deleteDuplicateRow")}
                  className="flex items-center space-x-2 w-full text-left"
                >
                  <div className="relative w-5 h-5">
                    <div
                      className={`absolute inset-0 ${
                        checkboxes.deleteDuplicateRow
                          ? "bg-blue-600"
                          : "border-2 border-gray-300"
                      } rounded transition-colors`}
                    ></div>
                    {checkboxes.deleteDuplicateRow && (
                      <Check className="absolute inset-0 w-5 h-5 text-white p-1" />
                    )}
                  </div>
                  <span className="text-gray-900 text-base">
                    Delete Duplicate Row
                  </span>
                </button>

                <div className="pt-4">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex space-x-3 items-center justify-between text-left font-medium text-gray-900"
                  >
                    <span>Missing Row</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {showError && !selectedOption && (
                    <p className="text-red-500 text-sm mt-1">
                      Require Select Column!
                    </p>
                  )}

                  <div
                    className={`mt-2 space-y-2 ${
                      isExpanded ? "block" : "hidden"
                    }`}
                  >
                    {missingRowOptions.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center space-x-3 py-2 px-1 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="missingRow"
                          value={option.value}
                          checked={selectedOption === option.value}
                          onChange={(e) => {
                            setSelectedOption(e.target.value);
                            setShowError(false);
                          }}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-900">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 py-6">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors rounded-[10px]"
              >
                Cancel
              </button>
              <button
                onClick={handleAutoClean}
                disabled={isLoading}
                className={`px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-[10px] ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Cleaning..." : "Auto Clean"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error and Success Messages */}
      {errorMessage && (
        <div className="fixed bottom-6 right-10 z-50">
          <ErrorMessage
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        </div>
      )}
      {successMessage && (
        <div className="fixed bottom-6 right-10 z-50">
          <SuccessMessage
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        </div>
      )}
    </>
  );
}
