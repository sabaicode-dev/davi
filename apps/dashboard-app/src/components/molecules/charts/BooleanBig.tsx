import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type BooleanProps = {
  data: { true: number; false: number };
  title: string;
};

const BooleanBig: React.FC<BooleanProps> = ({ data }) => {
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
      className="relative w-[400px] h-[300px] bg-white rounded-sm  p-2 pt-4 flex items-center justify-center"
    >
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

export default BooleanBig;
