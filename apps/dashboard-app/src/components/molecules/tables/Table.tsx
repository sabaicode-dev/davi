import React, { useState, useEffect, useRef, useCallback } from "react";
import { renderChart } from "@/src/utils/renderChart";

interface TableProps {
  headers: string[];
  data: Array<Record<string, any>>;
  metadata?: ChartMetadata[];
  isCheckBox?: boolean;
  isEditCell?: boolean;
  showChart?: boolean;
  onChartSelect?: (columnMetadata: any, chartData: any) => void;
  isSelectColumn?: boolean;
  onSaveCell?: (
    rowId: string | number,
    field: string,
    value: string
  ) => Promise<boolean>;
  onColumnSelect?: (selectedColumns: string[], columnData: any[]) => void;
  isFullHeight?: boolean;
  onChartClick?: (data: {
    category: string;
    percentage: number;
    type: string;
  }) => void;
  onScrollEnd?: () => void;
  isLoading?: boolean;
}

interface ChartMetadata {
  key: string;
  name: string;
  description?: string;
  table_column_info: {
    type: "STRING" | "NUMERIC" | "BOOLEAN" | "HISTOGRAM";
    order?: number; // Optional
    original_type?: string; // Optional
    extended_type?: string; // Optional
  };
  table_column_metrics: {
    string_metrics?: {
      counts: { key: string; value: number }[];
      most_common_value?: string;
      most_common_value_count?: number;
      unique_value_count?: number;
    };
    numeric_metrics?: {
      histogram: { range: string; count: number }[];
      buckets: [];
    };
    boolean_metrics?: {
      true_count: number;
      false_count: number;
    };
  };
}

const Table: React.FC<TableProps> = ({
  headers = [],
  data = [],
  isCheckBox = false,
  metadata = [],
  isEditCell = false,
  isSelectColumn = false,
  showChart = false,
  onSaveCell,
  onColumnSelect,
  onChartSelect,
  isFullHeight = false,
  onScrollEnd,
  isLoading = false
}) => {
  const [tableData, setTableData] = useState<Array<Record<string, any>>>(data);
  const [editingCell, setEditingCell] = useState<{
    row: number | null;
    header: string | null;
  }>({ row: null, header: null });
  const [selectedColumns, setSelectedColumns] = useState<Set<string>>(
    new Set()
  );
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );

  const tableRef = useRef<HTMLDivElement>(null);
  const scrollThreshold = 100; // pixels from bottom to trigger load more

  const handleScroll = useCallback(() => {
    if (!tableRef.current || !onScrollEnd || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
    console.log("Remaining scroll:", scrollHeight - scrollTop - clientHeight);

    if (scrollHeight - scrollTop - clientHeight < scrollThreshold) {
      onScrollEnd();
    }
  }, [onScrollEnd, isLoading]);

  const capitalizeFirstChar = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleSelectRow = (id: string | number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  const handleSelectColumn = (header: string) => {
    setSelectedColumns((prev) => {
      const updatedColumns = new Set(prev);
      if (updatedColumns.has(header)) {
        updatedColumns.delete(header); // Deselect column
      } else {
        updatedColumns.add(header); // Select column
      }
      return updatedColumns;
    });
  };

  const handleCellEdit = (rowIndex: number, header: string, value: string) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [header]: value };
    setTableData(updatedData);
  };

  const handleCellClick = (rowIndex: number, header: string) => {
    if (isEditCell) {
      setEditingCell({ row: rowIndex, header });
    }
  };

  const handleInputBlur = () => {
    setEditingCell({ row: null, header: null });
  };

  const handleInputKeyDown = async (
    e: React.KeyboardEvent,
    _rowIndex: number,
    header: string
  ) => {
    if (
      e.key === "Enter" &&
      editingCell.row !== null &&
      editingCell.header &&
      onSaveCell
    ) {
      const rowId = tableData[editingCell.row].id || editingCell.row;
      const value = tableData[editingCell.row][editingCell.header];

      const success = await onSaveCell(rowId, header, value);

      if (success) {
        handleInputBlur();
      }
    }
  };

  // Function to get data for selected columns
  const getDataForSelectedColumns = () => {
    return tableData.map((row) => {
      const selectedRowData: Record<string, any> = {};
      selectedColumns.forEach((column) => {
        selectedRowData[column] = row[column];
      });
      return selectedRowData;
    });
  };

  // Update tableData when data prop changes
  useEffect(() => {
    if (Array.isArray(data)) {
      setTableData(data);
    }
  }, [data]);

  // Notify parent component when selected columns change
  useEffect(() => {
    // Avoid re-triggering on same column selection
    if (onColumnSelect) {
      const selectedColumnData = getDataForSelectedColumns();
      if (selectedColumns.size > 0) {
        onColumnSelect(Array.from(selectedColumns), selectedColumnData);
      }
    }
  }, [selectedColumns, onColumnSelect]);

  useEffect(() => {
    const tableElement = tableRef.current;
    if (tableElement && onScrollEnd) {
      tableElement.addEventListener('scroll', handleScroll);
      return () => {
        console.log("Removing scroll event listener");
        tableElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll, onScrollEnd]);

  // Guard clause for empty data
  if (!Array.isArray(headers) || !Array.isArray(data) || headers.length === 0) {
    return (
      <div className="font-bold text-lg text-red-500">No data to display</div>
    );
  }

  const uniqueHeaders = Array.from(new Set(headers)); // Ensure unique headers
  const uniqueMetadata = metadata.filter(
    (value, index, self) => self.findIndex((v) => v.key === value.key) === index
  );

  return (
    <div
      ref={tableRef}
      className="overflow-auto w-full border-[1px] border-gray-400"
      style={{ height: isFullHeight ? "100%" : "95%" }}
    >
      <table
        className="border-collapse table-fixed"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead className="h-12 sticky top-0 z-10 bg-[#E6EDFF] border-[1px] border-t-0 border-gray-500 ">
          <tr className="text-center font-medium text-black  tracking-wider  ">
            {uniqueHeaders.map((header, index) => (
              <th
                key={`${header}-${index}`}
                className={`border-[1px] border-t-0 border-collapse border-gray-500  py-2 w-[210px] cursor-pointer relative group ${selectedColumns.has(header) ? "bg-blue-200" : ""
                  }`}
                onClick={() => handleSelectColumn(header)}
              >
                <div className="flex items-center justify-center">
                  {capitalizeFirstChar(header)}
                </div>
                {isSelectColumn && (
                  <div className="absolute inset-0 group-hover:bg-blue-100 opacity-0 group-hover:opacity-20 transition-opacity" />
                )}
              </th>
            ))}
          </tr>
          {showChart && (
            <tr className="bg-[#F7FAFF] ">
              {headers.map((header, index) => {
                const columnMetadata = Array.isArray(uniqueMetadata)
                  ? uniqueMetadata.find((col) => col.name === header)
                  : (null as any);

                return (
                  <td
                    key={`${header}-${index}`}
                    className="border-gray-500 border-[1px] w-[210px] h-[149px]"
                  >
                    {columnMetadata
                      ? renderChart(columnMetadata, onChartSelect) // Dynamically render chart for this column
                      : <div className="w-[209px] h-[149px] bg-red-50 flex items-center justify-center">
                        No chart Thanks!!
                      </div>}
                  </td>
                );
              })}
            </tr>
          )}
        </thead>
        <tbody className="bg-white">
          {tableData.map((row, rowIndex) => {
            const rowId = row?.id || rowIndex;

            return (
              <tr
                key={`row-${rowId}-${rowIndex}`}
                className={`border-[1px] border-gray-500 w-[210px] ${selectedRows.has(rowId) ? "bg-gray-300" : ""
                  }`}
              >
                {uniqueHeaders.map((header, colIndex) => (
                  <td
                    key={`cell-${rowId}-${header}`}
                    onClick={() => handleCellClick(rowIndex, header)}
                    className={`border-[1px] border-gray-500 overflow-hidden whitespace-nowrap text-ellipsis px-2 py-[3px] ${selectedColumns.has(header) ? "bg-blue-50" : ""
                      }`}
                  >
                    {/* Add checkbox for the first column */}
                    {colIndex === 0 && isCheckBox ? (
                      <div className="flex flex-row space-x-2 items-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(rowId)}
                          onChange={() => handleSelectRow(rowId)}
                          className="w-4 h-4 transition duration-200 ease-in-out transform scale-100 hover:scale-105 focus:scale-110 rounded-2xl"
                        />
                        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                          {Array.isArray(row[header])
                            ? row[header][0]
                            : row[header]}
                        </span>
                      </div>
                    ) : isEditCell &&
                      editingCell.row === rowIndex &&
                      editingCell.header === header ? (
                      <input
                        type="text"
                        value={row[header] || ""}
                        onChange={(e) =>
                          handleCellEdit(rowIndex, header, e.target.value)
                        }
                        onBlur={handleInputBlur}
                        onKeyDown={(e) =>
                          handleInputKeyDown(e, rowIndex, header)
                        }
                        autoFocus
                        className="border-[1px] px-1 w-full bg-red-100 rounded-none outline-none"
                      />
                    ) : Array.isArray(row[header]) ? (
                      row[header][0]
                    ) : (
                      row[header]
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isLoading && (
        <div className="w-full py-4 text-center text-gray-500">
          Loading more data...
        </div>
      )}
    </div>
  );
};

export default Table;
