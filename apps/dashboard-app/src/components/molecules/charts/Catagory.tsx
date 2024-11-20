import React from "react";

type DataItem = { category: string };
type ProcessedDataItem = {
  category: string;
  count: number;
  percentage: number;
};

// Process data to find top 2 categories and group the rest as "Others"
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
      category: "Others",
      count: othersCount,
      percentage: 0,
    });

  const totalCount = data.length;
  topCategories.forEach(
    (item) => (item.percentage = +((item.count / totalCount) * 100).toFixed(1))
  );

  return topCategories;
};

const CategoryItem: React.FC<{ category: string; percentage: number }> = ({
  category,
  percentage,
}) => (
  <div className="w-full flex flex-col space-y-1">
    <div className="w-full flex justify-between">
      <p>{category}</p>
      <p>{percentage}%</p>
    </div>
    <div className="w-full h-2 bg-slate-300 rounded-full">
      <div
        className="h-2 bg-blue-500 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

type CategoryProps = {
  data: DataItem[];
};

export const Category: React.FC<CategoryProps> = ({ data }) => {
  const processedData = processData(data);

  return (
    <div className="w-full space-y-1">
      <div className="w-full flex items-center justify-start">
        <div className="text-blue-800 text-xs bg-blue-300 rounded-md p-1 mb-2">
          <h1>Category</h1>
        </div>
      </div>
      <div className="flex flex-col justify-start h-24 text-xs space-y-2">
        {processedData.map((item, index) => (
          <CategoryItem
            key={index}
            category={item.category}
            percentage={item.percentage}
          />
        ))}
      </div>
    </div>
  );
};