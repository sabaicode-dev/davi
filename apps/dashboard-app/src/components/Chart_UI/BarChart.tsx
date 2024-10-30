import Chart from "react-apexcharts";

export const BarChart = () => {
  const chartOptions = {
    chart: {
      type: "bar" as const, // Explicitly specifying 'as const' for the chart type
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
      ],
    },
    colors: ["#1C64F2"], // Custom bar color
    grid: {
      borderColor: "#90CAF9",
    },
  };

  const chartSeries = [
    {
      name: "Value",
      data: [30, 70, 50, 90, 60], // Data corresponding to each category
    },
  ];

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};
