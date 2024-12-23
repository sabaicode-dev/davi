import React from "react";

type DataItem = { category: string; value: number };
type ProcessedDataItem = {
  category: string;
  count: number;
  percentage: number;
};

type CategoryProps = {
  data: DataItem[];
  title?: string;
  type?: string;
  onClick: (item: ProcessedDataItem) => void;
};

const processData = (data: DataItem[]): ProcessedDataItem[] => {
  const totalCount = data.reduce((sum, item) => sum + item.value, 0);

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
  type = "Category",
  onClick,
}) => {
  const processedData = processData(data);

  const topItem = processedData[0] || { category: "", percentage: 0 };

  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md p-2 flex flex-col justify-center cursor-pointer"
      onClick={() => onClick(topItem)}
    >
      {/* Title */}
      <div className="absolute top-2 left-2">
        <div className="text-green-800 text-xs bg-green-100 px-2 py-1 rounded">
          {`${type}`}
        </div>
      </div>

      {/* Categories */}
      <div className="w-full h-full flex flex-col justify-evenly pt-6 px-2">
        {processedData.map((item, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <div className="flex justify-between text-xs">
              <span title={item.category}>
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
