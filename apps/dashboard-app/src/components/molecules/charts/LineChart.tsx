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

const LineChart: React.FC<LineChartProps> = ({
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

const LineChartTest: React.FC = () => {
  // Sample data for the line chart
  const sampleData = [
    { month: "Jan", sales: 30, expenses: 20, profit: 10 },
    { month: "Feb", sales: 40, expenses: 25, profit: 15 },
    { month: "Mar", sales: 35, expenses: 22, profit: 13 },
    { month: "Apr", sales: 50, expenses: 30, profit: 20 },
    { month: "May", sales: 55, expenses: 35, profit: 20 },
    { month: "Jun", sales: 60, expenses: 40, profit: 20 },
  ];

  return (
    <div className="w-full h-full mt-24">
      <h1>Monthly Performance</h1>
      <LineChart data={sampleData} show_category={true} />
    </div>
  );
};

export { LineChart, LineChartTest };
