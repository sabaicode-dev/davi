import React from "react";

type BooleanData = {
  user_name: string;
  Boolean: boolean;
};

type BooleanChartProps = {
  data: BooleanData[];
};

export const BooleanChart: React.FC<BooleanChartProps> = ({ data }) => {
  // Calculate totals
  const totalUsers = data.length;
  const yesCount = data.filter((item) => item.Boolean).length;
  const noCount = totalUsers - yesCount;

  // Calculate percentages with fallback for empty data
  const yesPercentage = totalUsers > 0 ? (yesCount / totalUsers) * 100 : 0;
  const noPercentage = totalUsers > 0 ? (noCount / totalUsers) * 100 : 0;

  return (
    <div className="w-full bg-slate-100 px-[15px] py-[20px] space-y-1">
      <div className="w-full flex items-center justify-start">
        <div className="text-white text-[12px] bg-green-500 rounded-md p-1 mb-2">
          <h1>Boolean</h1>
        </div>
      </div>

      {/* Check for empty data */}
      {totalUsers === 0 ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="space-y-3">
          {/* Yes Chart */}
          <div className="flex flex-col justify-start text-xs space-y-1">
            <div>
              <div className="w-full flex flex-row justify-between">
                <p>Yes: {yesCount}</p>
                <p>{yesPercentage.toFixed(2)}%</p>
              </div>
              <div className="w-full h-2 bg-slate-300 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${yesPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* No Chart */}
          <div className="flex flex-col justify-start text-xs space-y-1">
            <div>
              <div className="w-full flex flex-row justify-between">
                <p>No: {noCount}</p>
                <p>{noPercentage.toFixed(2)}%</p>
              </div>
              <div className="w-full h-2 bg-slate-300 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${noPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
