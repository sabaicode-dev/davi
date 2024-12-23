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
};

// Process data to group categories and calculate their percentages
const processData = (data: DataItem[]): ProcessedDataItem[] => {
  const categoryCount = data.reduce<Record<string, number>>(
    (acc, { category }) => ({ ...acc, [category]: (acc[category] || 0) + 1 }),
    {}
  );

  // Sort categories by count in descending order
  const sortedCategories = Object.entries(categoryCount).sort(
    ([, a], [, b]) => b - a
  );

  const totalCount = data.length;

  // Map each category to ProcessedDataItem with percentage
  const categories = sortedCategories.map(([category, count]) => ({
    category,
    count,
    percentage: +((count / totalCount) * 100).toFixed(),
  }));

  return categories;
};

const CategoryBig: React.FC<CategoryProps> = ({ data }) => {
  const processedData = processData(data);

  return (
    <div className="relative w-[400px] bg-white rounded-sm  p-2 flex flex-col justify-center ">
      {/* Categories */}
      <div className="w-full h-full flex flex-col justify-evenly pt-6 px-2 ">
        {processedData.map((item, index) => (
          <div key={index} className="flex flex-col space-y-1 py-2">
            <div className="flex justify-between text-xs">
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
};

export default CategoryBig;
