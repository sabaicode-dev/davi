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
  const [editCell, setEditCell] = useState<{ rowIndex: number; key: string } | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const isColumnSelectable = (key: string) => {
    return selectableColumns === "all" || selectableColumns.includes(key);
  };

  const handleColumnClick = (key: string) => {
    if (allowColumnSelection && isColumnSelectable(key)) {
      setSelectedColumns((prevSelected) =>
        prevSelected.includes(key) ? prevSelected.filter((col) => col !== key) : [...prevSelected, key]
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

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>, rowIndex: number, key: string) => {
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

  const cellWidth = showCheckbox ? "210px" : "20px";

  return (
    <div className="flex flex-col">
      <div className="overflow-auto" style={{ maxHeight: "890px", maxWidth: "100%" }}>
        <table className="min-w-full border-collapse border-2 border-gray-300">
          <thead className="border-2 border-gray-300 bg-[#E6EDFF]">
            <tr>
              {showIndex && (
                <th
                  style={{ width: cellWidth }}
                  className="flex px-6 py-3 text-left text-[22px] justify-center items-center font-bold text-gray-500 tracking-wider border-1 border-gray-300 bg-[#E6EDFF]"
                >
                  #
                </th>
              )}
              {headers.map((header) => (
                <th
                  key={header.key}
                  style={{ width: cellWidth }}
                  onClick={() => handleColumnClick(header.key)}
                  className={`px-6 py-1 text-left text-[16px] font-bold text-gray-700 tracking-wider border-2 border-gray-300 bg-[#E6EDFF] ${
                    selectedColumns.includes(header.key) ? "bg-blue-200" : ""
                  } ${allowColumnSelection && isColumnSelectable(header.key) ? "cursor-pointer" : "cursor-default"}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 border-2 border-gray-300">
            {rows.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <tr
                  className={`transition duration-200 ${
                    checkedItems[rowIndex] ? "bg-blue-200 " : "hover:bg-gray-200 justify-center items-center"
                  }`}
                >
                  {!(firstRowHasChildren && rowIndex === 0) && showCheckbox && (
                    <td
                      style={{ width: cellWidth }}
                      className="flex border-gray-300 justify-center items-center"
                    >
                      <input
                        id={`checkbox-${rowIndex}`}
                        type="checkbox"
                        checked={!!checkedItems[rowIndex]}
                        onChange={() => handleCheckboxChange(rowIndex)}
                        className="w-6 h-6 appearance-none border cursor-pointer border-gray-300 rounded-md checked:bg-indigo-500 checked:border-indigo-500 focus:ring-indigo-300 focus:ring-offset-2"
                      />
                    </td>
                  )}
                  {!(firstRowHasChildren && rowIndex === 0) && showIndex && (
                    <td
                      style={{ width: cellWidth }}
                      className="px-6 py-2 text-[14px] font-semibold text-gray-700 border-2 border-gray-300"
                    >
                      {rowIndex + 1}
                    </td>
                  )}
                  {headers.map((header) => (
                    <td
                      key={header.key}
                      style={{ width: cellWidth }}
                      className={`pl-4 text-[14px] text-gray-900 cursor-pointer border-2 border-gray-300 ${
                        selectedColumns.includes(header.key) ? "bg-gray-200" : ""
                      } ${editCell?.rowIndex === rowIndex && editCell.key === header.key ? "text-indigo-500" : ""}`}
                      onClick={() => handleCellClick(rowIndex, header.key)}
                    >
                      {firstRowHasChildren && rowIndex === 0 && childrenContent ? (
                        <div className="flex items-center justify-center">{childrenContent}</div>
                      ) : editable && editCell?.rowIndex === rowIndex && editCell.key === header.key ? (
                        <input
                          type="text"
                          value={row[header.key]}
                          onChange={(e) => handleCellChange(e, rowIndex, header.key)}
                          onBlur={handleSaveCell}
                          onKeyDown={handleKeyDown}
                          style={{ width: "190px" }} // Width of input itself
                          className="border rounded border-none outline-none bg-transparent"
                          autoFocus
                        />
                      ) : (
                        row[header.key]
                      )}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
