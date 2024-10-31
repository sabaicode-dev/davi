import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Define the data structure for each data item
interface DataItem {
  category: string;
}

// Define the prop types for PieChart, including the show_category prop
interface PieChartProps {
  data: DataItem[];
  show_category?: boolean; // Optional prop to enable/disable categories
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  show_category = false,
}) => {
  // Count occurrences for each category
  const categoryCounts = data.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Extract labels and series data for the pie chart
  const labels = Object.keys(categoryCounts);
  const series = Object.values(categoryCounts);

  // Chart options
  const chartOptions: ApexOptions = {
    // colors: ["#1C64F2", "#16BDCA", "#9061F9", "#F97316", "#10B981", "#F97346"],
    chart: {
      type: "pie",
      height: 420,
      width: "100%",
    },
    stroke: {
      colors: ["white"],
    },
    plotOptions: {
      pie: {
        customScale: 1,
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels,
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      show: show_category, // Show or hide legend based on show_category prop
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };

  return (
    <div>
      <ApexCharts
        options={chartOptions}
        series={series}
        type="pie"
        height={350}
      />
    </div>
  );
};
