import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface NumberProps {
  data: number[]; // Array of bar heights
  labels: string[]; // Array of x-axis labels
  title?: string; // Optional title
}

const NumberBig: React.FC<NumberProps> = ({
  data,
  labels,
}) => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      animations: { enabled: true },
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
      show: true,
    },
    grid: {
      show: true,
  
      
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
      className="relative w-[400px] h-[300px] bg-white rounded-sm pt-2 flex items-center justify-center cursor-pointer"
    >
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

export default NumberBig;
