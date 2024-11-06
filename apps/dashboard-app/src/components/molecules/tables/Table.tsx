import React, { useState } from "react";

interface TableHeader {
  label: string;
  key: string;
}

interface TableRowData {
  [key: string]: string | number;
}

interface ITableProps {
  headers: TableHeader[];
  data: TableRowData[];
  showCheckbox?: boolean;
  showIndex?: boolean;
  editable?: boolean;
  allowColumnSelection?: boolean;
  selectableColumns?: string[] | "all";
  firstRowHasChildren?: boolean;
  childrenContent?: React.ReactNode;
}

const Table: React.FC<ITableProps> = ({
  headers,
  data,
  showCheckbox = true,
  showIndex = true,
  editable = true,
  allowColumnSelection = true,
  selectableColumns = [],
  firstRowHasChildren = false,
  childrenContent = null,
}) => {
  const [rows, setRows] = useState(data);
  const [editCell, setEditCell] = useState<{
    rowIndex: number;
    key: string;
  } | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const isColumnSelectable = (key: string) => {
    return selectableColumns === "all" || selectableColumns.includes(key);
  };

  const handleColumnClick = (key: string) => {
    if (allowColumnSelection && isColumnSelectable(key)) {
      setSelectedColumns((prevSelected) =>
        prevSelected.includes(key)
          ? prevSelected.filter((col) => col !== key)
          : [...prevSelected, key]
      );
    }
  };

  const handleCellClick = (rowIndex: number, key: string) => {
    if (editable) {
      setEditCell({ rowIndex, key });
    }
  };

  const handleCheckboxChange = (rowIndex: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  const handleAllCheckboxChange = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    const updatedCheckedItems = rows.reduce((acc, _, index) => {
      acc[index] = newCheckedState;
      return acc;
    }, {} as { [key: number]: boolean });
    setCheckedItems(updatedCheckedItems);
  };

  const handleCellChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    key: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][key] = e.target.value;
    setRows(updatedRows);
  };

  const handleSaveCell = () => {
    setEditCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveCell();
    }
  };

  return (
    <div className="flex flex-col max-height-percentage-table overflow-x-scroll">
      <div className="overflow-x-auto">
        <table
          className="min-w-full border-collapse border border-gray-300"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="bg-[#E6EDFF] border border-gray-300">
            <tr>
              {showCheckbox && (
                <th className="px-4 py-2 w-16 text-center font-bold text-gray-500 tracking-wider border-r-0 sticky top-0 bg-[#E6EDFF] z-10 h-16">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={handleAllCheckboxChange}
                    className="w-4 h-4 cursor-pointer"
                  />
                </th>
              )}
              {showIndex && !showCheckbox && (
                <th className="px-4 py-2 w-16 text-center font-bold text-gray-500 tracking-wider border sticky top-0 bg-[#E6EDFF] z-10">
                  #
                </th>
              )}
              {headers.map((header, index) => (
                <th
                  key={header.key}
                  onClick={() => handleColumnClick(header.key)}
                  className={`px-6 py-2 text-left font-bold text-gray-700 tracking-wider border sticky top-0 bg-[#E6EDFF] z-10 ${
                    selectedColumns.includes(header.key) ? "bg-blue-200" : ""
                  } ${
                    allowColumnSelection && isColumnSelectable(header.key)
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                  style={{ width: "200px" }}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 overflow-auto">
            {firstRowHasChildren && (
              <tr>
                <td
                  colSpan={
                    headers.length +
                    (showCheckbox ? 1 : 0) +
                    (showIndex ? 1 : 0)
                  }
                >
                  <div>{childrenContent}</div>
                </td>
              </tr>
            )}
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`transition duration-200 ${
                  checkedItems[rowIndex] ? "bg-blue-200" : "hover:bg-gray-100"
                }`}
              >
                {showCheckbox && (
                  <td className="px-4 py-2 text-center border-r-0">
                    <input
                      type="checkbox"
                      checked={!!checkedItems[rowIndex]}
                      onChange={() => handleCheckboxChange(rowIndex)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                )}
                {!showCheckbox && showIndex && (
                  <td className="px-4 py-2 text-center font-semibold text-gray-700 border">
                    {rowIndex + 1}
                  </td>
                )}
                {headers.map((header) => (
                  <td
                    key={header.key}
                    onClick={() => handleCellClick(rowIndex, header.key)}
                    className={`px-4 py-2 text-gray-900 border ${
                      selectedColumns.includes(header.key) ? "bg-gray-200" : ""
                    } ${
                      editCell?.rowIndex === rowIndex &&
                      editCell.key === header.key
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ width: "200px" }}
                  >
                    {editable &&
                    editCell?.rowIndex === rowIndex &&
                    editCell.key === header.key ? (
                      <input
                        type="text"
                        value={row[header.key]}
                        onChange={(e) =>
                          handleCellChange(e, rowIndex, header.key)
                        }
                        onBlur={handleSaveCell}
                        onKeyDown={handleKeyDown}
                        className="w-full border-none outline-none bg-transparent"
                        autoFocus
                      />
                    ) : (
                      row[header.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
