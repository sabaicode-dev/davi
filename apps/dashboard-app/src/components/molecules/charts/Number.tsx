import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


interface NumberProps {
  data: number[]; 
  labels: string[]; 
  title: string; 
  type?: string; 
  onClick: () => void; 
}


const Number: React.FC<NumberProps> = ({
  data,
  labels,
  title,
  type = "Number",
  onClick,
}) => {
  
  const MAX_BARS = 8;

  
  const processedData = data.length > MAX_BARS
    ? [
        ...data.slice(0, MAX_BARS - 1), 
        data.slice(MAX_BARS - 1).reduce((sum, value) => sum + value, 0), 
      ]
    : data;

  const processedLabels = labels.length > MAX_BARS
    ? [
        ...labels.slice(0, MAX_BARS - 1), 
        "Others",
      ]
    : labels;


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
      categories: processedLabels, 
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
      enabled: true, 
      y: {
        formatter: (value) => `${value}`, 
      },
    },
  };

  // Chart data
  const chartSeries = [
    {
      name: "Count", 
      data: processedData, 
    },
  ];

  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md pt-2 flex items-center justify-center cursor-pointer"
      onClick={onClick} 
    >
      {/* Title */}
      {title && (
        <div className="absolute top-2 left-2">
          <div className="text-blue-800 text-xs bg-blue-100 px-2 py-1 rounded">
            {`${type}`}
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
