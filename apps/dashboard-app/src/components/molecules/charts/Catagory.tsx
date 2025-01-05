import React, { useRef, useState } from "react";
import Chart from "react-apexcharts";
import { toPng } from "html-to-image";
import { ApexOptions } from "apexcharts";

type DataItem = { category: string; value: number };
type ProcessedDataItem = {
  category: string;
  count: number;
  percentage: number;
};

interface CategoryProps {
  data: DataItem[]; // Array of data items
  name?: string; // Optional name
  type?: string; // Optional type
  onClick: (item: { category: string; name: string; value: number }) => void; // Click handler
  isBig?: boolean; // Determines if the component should render as CategoryBig
}

// Process data
const processData = (data: DataItem[], showAll: boolean): ProcessedDataItem[] => {
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

  if (showAll) {
    return data.map((item) => ({
      category: item.category,
      count: item.value,
      percentage: +((item.value / totalCount) * 100).toFixed(1),
    }));
  }

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const topCategories = sortedData.slice(0, 2).map((item) => ({
    category: item.category,
    count: item.value,
    percentage: 0,
  }));

  const othersCount = sortedData
    .slice(2)
    .reduce((sum, item) => sum + item.value, 0);

  if (othersCount) {
    topCategories.push({
      category: "Other+",
      count: othersCount,
      percentage: 0,
    });
  }

  topCategories.forEach(
    (item) => (item.percentage = +((item.count / totalCount) * 100).toFixed(1))
  );

  return topCategories;
};

const Category: React.FC<CategoryProps> = ({
  data,
  name = "Unknown Header",
  type = "Category",
  onClick,
  isBig = false,
}) => {
  const processedData = processData(data, isBig);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const downloadImage = () => {
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "none"; // Hide the dropdown temporarily
    }

    if (containerRef.current) {
      toPng(containerRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `${name || "image"}.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Failed to download image", error);
        })
        .finally(() => {
          if (dropdownRef.current) {
            dropdownRef.current.style.display = ""; // Restore the dropdown visibility
          }
        });
    }
  };

  const downloadData = () => {
    const csvContent = processedData
      .map((item) => `${item.category},${item.count},${item.percentage}%`)
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name || "data"}.csv`;
    link.click();
  };

  if (isBig) {
    return (
      <div
        ref={containerRef}
        className="relative w-[400px] bg-white rounded-sm p-4 flex flex-col justify-center"
      >
        <div
          ref={dropdownRef}
          className="absolute top-0 right-4"
        >
          <button
            className="text-gray-500 hover:text-black"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          >
            ☰
          </button>
          {dropdownVisible && (
            <div className="absolute top-33 w-[120px] right-1 bg-white shadow rounded flex flex-col space-y-1 ">
              <button
                onClick={downloadImage}
                className="text-[11px]  px-4 py-2 hover:bg-gray-100"
              >
                Download PNG
              </button>
              <button
                onClick={downloadData}
                className="text-[11px] px-4 py-2 hover:bg-gray-100"
              >
                Download CSV
              </button>
            </div>
          )}
        </div>
        <div className="w-full h-full flex flex-col justify-evenly">
          {processedData.map((item, index) => (
            <div key={index} className="flex flex-col space-y-2 py-1">
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span>{item.percentage}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full">
                <div
                  className="h-3 bg-blue-500 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md p-2 flex flex-col justify-center hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() =>
        onClick({
          category: type || "Category",
          name,
          value: processedData.reduce((sum, item) => sum + item.count, 0),
        })
      }
    >
      <div className="absolute top-2 left-2">
        <div className="text-green-800 text-xs bg-green-100 px-2 py-1 rounded">
          {type}
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-evenly pt-6 px-2">
        {processedData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col space-y-1"
            title={`Click to view details for ${item.category}`}
          >
            <div className="flex justify-between text-xs">
              <span>
                {item.category.length > 10
                  ? `${item.category.substring(0, 10)}...`
                  : item.category}
              </span>
              <span>{item.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
