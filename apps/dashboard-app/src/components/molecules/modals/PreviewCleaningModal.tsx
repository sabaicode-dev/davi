import React, { useEffect, useState, useMemo, useCallback } from "react";
import { X } from "lucide-react";
import Table from "../tables/Table";
import Spinner from "../loading/Spinner";
import request from "@/src/utils/helper";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  projectId: string;
  fileId: string;
}

export function PreviewCleaningModal({
  isOpen,
  onClose,
  projectId,
  fileId,
}: ModalProps) {
  // LOADING & ERROR
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // DATA STORES
  const [missingRows, setMissingRows] = useState<any[]>([]);
  const [duplicateRows, setDuplicateRows] = useState<any[]>([]);
  const [outliers, setOutliers] = useState<{ [key: string]: any[] }>({});

  const fetchDetailData = async (page = 1, append = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/${fileId}/accuracy/detail/?p=${page}`,
        method: "GET",
      });

      if (!response) {
        setError("No response data");
        return;
      }

      const data = response?.data;
      const newMissingRows = append
        ? [...missingRows, ...(data?.results?.missing_rows || [])]
        : data?.results?.missing_rows || [];

      const newDuplicateRows = append
        ? [...duplicateRows, ...(data?.results?.duplicate_rows || [])]
        : data?.results?.duplicate_rows || [];


      const outliersData = data?.results?.outliers || {};

      setMissingRows(newMissingRows);
      setDuplicateRows(newDuplicateRows);
      setOutliers(outliersData);
      setHasMore(!!data?.next); // next is not null => has more pages
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || "Error fetching detail data");
    } finally {
      setIsLoading(false);
    }
  };

  // Combine all issues into one array for a single Table
  const combinedIssuesData = useMemo(() => {
    const missingRowsList = missingRows.map((row) => ({
      ...row,
      issueType: "Missing Row",
    }));

    const duplicateRowsList = duplicateRows.map((row) => ({
      ...row,
      issueType: "Duplicate Row",
    }));

    // Flatten outliers if needed
    const outlierList = Object.entries(outliers).flatMap(([columnKey, values]) =>
      values.map((val: any) => ({
        column: columnKey,
        outlierValue: val,
        issueType: "Outlier",
      }))
    );

    return [...missingRowsList, ...duplicateRowsList, ...outlierList];
  }, [missingRows, duplicateRows, outliers]);

  // Generate headers from the combined data
  const tableHeaders = useMemo(() => {
    const baseHeaders = ["issueType"];
    return combinedIssuesData.reduce((acc, row) => {
      Object.keys(row).forEach((key) => {
        if (!acc.includes(key)) acc.push(key);
      });
      return acc;
    }, baseHeaders);
  }, [combinedIssuesData]);

  // When user scrolls to the bottom, load the next page (if any).   
  const handleScrollEnd = useCallback(() => {
    console.log('handleScrollEnd', currentPage, hasMore, isLoading)
    if (!isLoading && hasMore) {
      fetchDetailData(currentPage + 1, true); // append next page
    }
  }, [currentPage, hasMore, isLoading]);

  // Fetch page=1 data whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setMissingRows([]);
      setDuplicateRows([]);
      setOutliers({});
      setCurrentPage(1);
      // Immediately fetch the first page
      fetchDetailData(1, false);
    }
  }, [isOpen]);

  // Render nothing if modal not open
  if (!isOpen) return null;

  console.log('data::: ', combinedIssuesData)
  console.log('isLoading::: ', isLoading)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-55 flex items-center justify-center z-50">
      <div className="flex flex-col space-y-3 bg-white rounded-2xl w-3/4 max-h-[90vh] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pr-6 pt-2 pl-3">
          <h2 className="text-xl font-semibold p-3">Data Accuracy Details</h2>
          <button
            onClick={onClose}
            className="flex text-gray-500 hover:text-gray-700 transition-colors 
            justify-center items-center w-8 h-8 bg-gray-100 
            hover:bg-gray-200 duration-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-4 overflow-auto h-[400px]">
          {isLoading && !combinedIssuesData.length ? (
            <div className="flex justify-center items-center h-64">
              <Spinner />
            </div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <Table
              headers={tableHeaders}
              data={combinedIssuesData}
              isCheckBox={true}
              isEditCell={true}
              isSelectColumn={true}
              onScrollEnd={handleScrollEnd}
              isLoading={isLoading}
              isFullHeight={true}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 pb-6 px-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-600 
            hover:bg-gray-50 transition-colors rounded-[10px]"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700
            transition-colors rounded-[10px]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
