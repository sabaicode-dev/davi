import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type BooleanProps = {
  data: { true: number; false: number };
  title: string;
  onClick: () => void; // Callback for click
};

const Boolean: React.FC<BooleanProps> = ({ data, title = "Boolean", onClick }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "pie",
      toolbar: { show: false },
    },
    labels: ["True", "False"],
    legend: {
      position: "bottom",
      markers: {
        size: 4,
        shape: "circle",
      },
    },
    colors: ["#3b82f6", "#a5b4fc"],
    tooltip: {
      enabled: false,
      y: {
        formatter: (value: number) => `${value}%`,
      },
    },
  };

  const chartSeries = [
    ((data.true / (data.true + data.false)) * 100).toFixed(1),
    ((data.false / (data.true + data.false)) * 100).toFixed(1),
  ].map((value) => parseFloat(value));

  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md p-2 pt-4 flex items-center justify-center cursor-pointer "
      onClick={onClick} // Use onClick prop
    >
      {/* Title */}
      {title && (
        <div className="absolute top-2 left-2">
          <div className="text-blue-800 text-xs bg-blue-100 px-2 py-1 rounded">
            {title}
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="w-full h-full flex items-center justify-center">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Boolean;
