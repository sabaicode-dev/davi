import React, { useState, useEffect } from "react";

interface TableProps {
  headers: string[];
  data: Array<Record<string, any>>;
}

const ViewTable: React.FC<TableProps> = ({ headers = [], data = [] }) => {
  const [tableData, setTableData] = useState<Array<Record<string, any>>>(data);

  // Guard clause for empty data
  if (!Array.isArray(headers) || !Array.isArray(data) || headers.length === 0) {
    return <div>No data to display</div>;
  }
  return (
    <div
      className="overflow-auto w-full border-[1px] border-gray-400 text-black"
      style={{ height: "92%" }}
    >
      <table
        className="border-collapse table-fixed"
        style={{ tableLayout: "fixed", width: "100%" }}
      >
        <thead className="h-12">
          <tr className="px-4 text-center font-medium text-black tracking-wider sticky top-0 bg-[#E6EDFF] z-10">
            {headers.slice(1).map((header) => (
              <th
                key={header}
                className="border-[1px] border-t-0 border-gray-500 px-2 w-[210px] cursor-pointer relative group"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {tableData.map((row, index) => {
            return (
              <tr key={index} className="border-[1px] border-gray-500">
                {headers.slice(1).map((header) => (
                  <td
                    key={header}
                    className="border-[1px] border-gray-500 overflow-hidden whitespace-nowrap text-ellipsis px-2 py-[3px]"
                    style={{ maxWidth: "163px" }}
                  >
                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">{row[header] || ""}</p>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTable;
