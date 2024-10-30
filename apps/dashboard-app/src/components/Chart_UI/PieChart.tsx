import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export const PieChart = () => {
  const chartOptions: ApexOptions = {
    colors: ["#1C64F2", "#16BDCA", "#9061F9"],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
    },
    plotOptions: {
      pie: {
        customScale: 1, // Use customScale to adjust the size of the pie chart
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["Direct", "Organic search", "Referrals"], // Moved labels to the top level
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };

  //! Mock Data
  const series = [52.8, 26.8, 20.4];

  return (
    <div>
      <ApexCharts
        options={chartOptions}
        series={series}
        type="pie"
        height={420}
      />
    </div>
  );
};
