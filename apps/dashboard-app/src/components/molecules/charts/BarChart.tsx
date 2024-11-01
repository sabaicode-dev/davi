import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Define the type for individual data items
interface DataItem {
  category: string;
}

// Define prop types for the BarChart component
interface BarChartProps {
  data: DataItem[];
  show_category?: boolean;
}

// Define the BarChart component
const BarChart: React.FC<BarChartProps> = ({ data, show_category = false }) => {
  // Count occurrences for each category
  const categoryCounts = data.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  // Convert categoryCounts to a sorted array and extract categories and values
  const sortedCategoriesAndValues = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
    .map(([category, count]) => ({ category, count }));

  // Extract sorted categories and values
  const categories = sortedCategoriesAndValues.map((item) => item.category);
  const values = sortedCategoriesAndValues.map((item) => item.count);

  // Generate unique colors for each category
  const colors = categories.map(
    (_, index) => `hsl(${(index * 360) / categories.length}, 70%, 50%)`
  );

  // Enhanced chart options with specified types
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 8,
        distributed: true, // Enable individual bar colors
        barHeight: "70%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      x: {
        show: true,
      },
      y: {
        title: {
          formatter: () => "Count",
        },
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#333",
          fontSize: "14px",
          fontWeight: "600",
        },
      },
    },

    colors, // Use dynamic colors array for distributed bars
    grid: {
      borderColor: "#E0E0E0",
      strokeDashArray: 5,
    },
    legend: {
      show: show_category,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };

  // Chart series data
  const chartSeries = [
    {
      name: "Count",
      data: values, // Sorted values
    },
  ];

  return (
    <div className="h-32">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
