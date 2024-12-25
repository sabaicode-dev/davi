import React from "react";

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

// Process data for the normal view
const processData = (data: DataItem[], showAll: boolean): ProcessedDataItem[] => {
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

  if (showAll) {
    // Show all categories in the detailed view
    return data.map((item) => ({
      category: item.category,
      count: item.value,
      percentage: +((item.value / totalCount) * 100).toFixed(1),
    }));
  }

  // Summarize data for the normal view with "Other+"
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

  // Calculate percentages
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
  isBig = false, // Default to normal view
}) => {
  const processedData = processData(data, isBig);

  if (isBig) {
    // Render CategoryBig
    return (
      <div className="relative w-[400px] bg-white rounded-sm p-4 flex flex-col justify-center">
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

  // Render normal Category
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
      {/* Title */}
      <div className="absolute top-2 left-2">
        <div className="text-green-800 text-xs bg-green-100 px-2 py-1 rounded">
          {type}
        </div>
      </div>

      {/* Categories */}
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
