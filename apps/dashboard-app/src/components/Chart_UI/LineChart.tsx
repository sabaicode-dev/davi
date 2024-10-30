import React from "react";
import Chart from "react-apexcharts";

export const LineChart = () => {
  const chartOptions = {
    chart: {
      type: "line" as const, // Explicitly specifying 'as const' for the chart type
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight" as const, // Set curve to a specific allowed value
      width: 2, // Thickness of the lines
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ], // Example categories for the x-axis
    },
    colors: ["#FF0000", "#0000FF", "#00FF00", "#FFFF00"], // Updated colors: red, blue, green, yellow
    dataLabels: {
      enabled: false, // Disable data labels for a cleaner look
    },
    grid: {
      borderColor: "#e7e7e7",
    },
    tooltip: {
      enabled: true,
    },
  };

  const chartSeries = [
    {
      name: "Series 1",
      data: [10, 40, 30, 60, 90, 70, 80, 100, 110, 130, 150, 160],
    },
    {
      name: "Series 2",
      data: [20, 30, 50, 80, 70, 60, 90, 120, 140, 130, 160, 180],
    },
    {
      name: "Series 3",
      data: [30, 20, 60, 70, 50, 90, 110, 130, 120, 150, 170, 200],
    },
    {
      name: "Series 4",
      data: [40, 50, 70, 90, 100, 110, 130, 140, 150, 170, 190, 210],
    },
  ];

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
