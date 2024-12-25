import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type BooleanProps = {
  data: { true: number; false: number }; // Boolean data for true/false counts
  title: string; // Title for the chart
  onClick: (chartData: { label: string; value: number }) => void; // Callback for click with data
};

const Boolean: React.FC<BooleanProps> = ({ data, title = "Boolean", onClick }) => {
  // Calculate percentages for true/false values
  const total = data.true + data.false;
  const truePercentage = ((data.true / total) * 100).toFixed(1);
  const falsePercentage = ((data.false / total) * 100).toFixed(1);

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
      enabled: true,
      y: {
        formatter: (value: number) => `${value.toFixed(1)}%`,
      },
    },
  };

  const chartSeries = [
    parseFloat(truePercentage),
    parseFloat(falsePercentage),
  ];

  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md p-2 pt-4 flex items-center justify-center cursor-pointer"
      onClick={() =>
        onClick({
          label: "Boolean Data",
          value: total,
        })
      } // Pass total data when clicked
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
