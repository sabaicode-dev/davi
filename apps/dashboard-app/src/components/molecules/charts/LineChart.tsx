import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Define the data structure for each data item
interface DataItem {
  month: string;
  [key: string]: number | string;
}

// Define the prop types for LineChart
interface LineChartProps {
  data: DataItem[];
  show_category?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  show_category = false,
}) => {
  // Extracting months for the x-axis
  const months = data.map((item) => item.month);

  // Extracting unique categories from the first data item, excluding "month"
  const categories = Object.keys(data[0]).filter((key) => key !== "month");

  // Creating series data for each category
  const chartSeries = categories.map((category) => ({
    name: category,
    data: data.map((item) => item[category] as number),
  }));

  // Chart options with type definition
  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    xaxis: {
      categories: months, // Dynamically generated months
    },
    colors: ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#FF00FF"], // Colors for each category
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#e7e7e7",
    },
    tooltip: {
      enabled: true,
    },
    legend: {
      show: show_category, // Show or hide legend based on show_category prop
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};
