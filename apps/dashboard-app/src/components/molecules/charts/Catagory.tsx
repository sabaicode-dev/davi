import React from "react";

type DataItem = { category: string };
type ProcessedDataItem = {
  category: string;
  count: number;
  percentage: number;
};

type CategoryProps = {
  data: DataItem[]; // Raw data for processing
  title?: string; // Optional title for the component
  onClick: (item: { category: string; percentage: number }) => void; // Callback for clicks
};

// Process data to find top 2 categories and group the rest as "Other"
const processData = (data: DataItem[]): ProcessedDataItem[] => {
  const categoryCount = data.reduce<Record<string, number>>(
    (acc, { category }) => ({ ...acc, [category]: (acc[category] || 0) + 1 }),
    {}
  );

  const sortedCategories = Object.entries(categoryCount).sort(
    ([, a], [, b]) => b - a
  );

  const topCategories = sortedCategories
    .slice(0, 2)
    .map(([category, count]) => ({
      category,
      count,
      percentage: 0,
    }));

  const othersCount = sortedCategories
    .slice(2)
    .reduce((sum, [, count]) => sum + count, 0);
  if (othersCount)
    topCategories.push({
      category: "Other+",
      count: othersCount,
      percentage: 0,
    });

  const totalCount = data.length;
  topCategories.forEach(
    (item) => (item.percentage = +((item.count / totalCount) * 100).toFixed(1))
  );

  return topCategories;
};

const Category: React.FC<CategoryProps> = ({
  data,
  title = "Category",
  onClick,
}) => {
  const processedData = processData(data);

  // Calculate the top item to trigger `onClick` for the entire component
  const topItem = processedData[0] || { category: "", percentage: 0 };

  return (
    <div
      className="relative w-[209px] h-[149px] bg-gray-100 rounded-sm shadow-md p-2 flex flex-col justify-center cursor-pointer"
      onClick={() => onClick(topItem)} // Trigger onClick with the top item
    >
      {/* Title */}
      <div className="absolute top-2 left-2">
        <div className="text-green-800 text-xs bg-green-100 px-2 py-1 rounded">
          {title}
        </div>
      </div>

      {/* Categories */}
      <div className="w-full h-full flex flex-col justify-evenly pt-6 px-2">
        {processedData.map((item, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <div className="flex justify-between text-xs">
              <span>{item.category}</span>
              <span>{item.percentage.toFixed(2)}%</span>
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
