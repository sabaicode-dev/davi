import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type

// Define props interface for the Number component
interface NumberProps {
  data: number[]; // Explicitly typing data as an array of numbers
}

export const Number: React.FC<NumberProps> = ({ data }) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar", // Set the type directly as "bar"
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: false,
        columnWidth: "70%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5", "6", "7", "8"], // Labels for the bars
      labels: {
        show: false, // Disable the x-axis labels to remove the bottom numbers
      },
    },
    colors: ["#3b82f6"], // Bar color
    fill: {
      opacity: 1,
    },
    grid: {
      show: false, // Disable grid lines and borders
    },
    yaxis: {
      show: false, // Disable y-axis labels and lines
      max: 100, // Set max limit for y-axis to 100
    },
  };

  const chartSeries = [
    {
      name: "Height",
      data: data, // Use the passed-in data prop here
    },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto h-44 px-[15px] pt-[20px] bg-slate-100">
      {/* Button on Top */}
      <div className="absolute top-[20px] left-[15px] flex items-center">
        <div className="text-green-800 text-[12px] bg-green-300 rounded-md px-2 py-1">
          <h1>Number</h1>
        </div>
      </div>

      {/* Chart */}
      <div className="h-full">
        <Chart
          options={chartOptions} // Pass the correctly typed options
          series={chartSeries} // Pass the series data
          type="bar" // Explicitly set type here for clarity
          width="70%"
          height="100%"
        />
      </div>
    </div>
  );
};
