import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface NumberProps {
  data: number[]; // Array of bar heights
  labels: string[]; // Array of x-axis labels
  title?: string; // Optional title
  onClick?: () => void; // Callback when the container is clicked
}

const Number: React.FC<NumberProps> = ({
  data,
  labels,
  title = "Number",
  onClick,
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      animations: { enabled: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        horizontal: false,
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: labels,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
  
      
    },
    colors: ["#3b82f6"],
    tooltip: {
      enabled: false,
    },
  };

  const chartSeries = [
    {
      name: "Count",
      data: data,
    },
  ];

  return (
    <div
      className="relative w-[209px] h-[149px] bg-gray-100 rounded-sm shadow-md pt-2 flex items-center justify-center cursor-pointer"
      onClick={onClick} // Trigger callback when the container is clicked
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
      <div className="w-full h-full">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Number;
