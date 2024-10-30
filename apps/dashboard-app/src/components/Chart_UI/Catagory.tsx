import React from "react";

export const Category = () => {
  const data = [
    { label: "China", percentage: 30 },
    { label: "Thai", percentage: 40 },
    { label: "Others", percentage: 20 },
  ];

  return (
    <div className="w-full bg-slate-100 px-[15px] py-[20px] space-y-1">
      <div className="w-full flex items-center justify-start">
        <div className="text-blue-800 text-[12px] bg-blue-300 rounded-md p-1 mb-2">
          <h1>Category</h1>
        </div>
      </div>
      {/* Chart */}
      <div className="flex flex-col justify-start h-24 text-[10px] space-y-1">
        {data.map((item, index) => (
          <div key={index}>
            <div className="w-full flex flex-row justify-between">
              <p>{item.label}</p>
              <p>{item.percentage} %</p>
            </div>
            <div className="w-full h-2 bg-slate-300 rounded-full">
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
