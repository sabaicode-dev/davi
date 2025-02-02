import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type BooleanProps = {
  data: { true: number; false: number }; // Boolean data for true/false counts
  title?: string; // Optional title for the chart
  onClick: (chartData: { category: string; name: string; value: number; type: string; label: string}) => void; // Callback for click with data
  isBig?: boolean; // Determines if the chart is in detailed view
};

const Boolean: React.FC<BooleanProps> = ({
  data,
  title = "Boolean Data",
  onClick,
  isBig = false, // Default to normal view
}) => {
  const total = data.true + data.false;

  // Chart options
  const chartOptions: ApexOptions = {
    chart: {
      type: "pie",
      toolbar: { show: isBig }, // Show toolbar in detailed view
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const label = config.w.config.labels[config.dataPointIndex];
          const value = config.w.config.series[config.dataPointIndex];
          onClick({
            category: "BOOLEAN", // Define the category as "BOOLEAN"
            name: label,
            value,
            type: '',
            label:''
          });
        },
      },
    },
    labels: ["True", "False"],
    legend: {
      position: isBig ? "right" : "bottom", // Legend position based on view
      markers: {
        size: 4,
        shape: "circle",
      },
    },
    colors: ["#3b82f6", "#a5b4fc"], // Define the colors for true/false
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${((value / total) * 100).toFixed(1)}%`,
      },
    },
  };

  // Data series for the chart
  const chartSeries = [data.true, data.false];

  // Render detailed view
  if (isBig) {
    return (
      <div className="relative w-[400px] h-[300px] bg-white rounded-sm p-4 ">
        <div className="w-full h-full">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="pie"
            height="100%"
          />
        </div>
      </div>
    );
  }

  // Render normal view
  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md p-2 flex flex-col justify-center cursor-pointer"
      onClick={() =>
        onClick({
          category: "BOOLEAN",
          name: title,
          value: total,
          type: '',
          label:''
        })
      }
    >
      {/* Title */}
      <div className="absolute top-2 left-2">
        <div className="text-purple-800 text-xs bg-purple-100 px-2 py-1 rounded">
          Boolean
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-full flex items-center justify-center">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Boolean;
