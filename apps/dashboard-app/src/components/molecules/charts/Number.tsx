import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface NumberProps {
  data: number[];
  labels: string[];
  name?: string;
  type?: string;
  onClick: (item: { category: string; name: string; value: number }) => void;
  isAnalysisView?: boolean; // Prop to toggle between normal and analysis view
}
type NumericMetrics = {
  histogram: {
    buckets: { range: string; count: number }[];
  };
};

const Number: React.FC<NumberProps> = ({
  data,
  labels,
  name = "Unknown Header",
  type = "Number",
  onClick,
  isAnalysisView = false, // Default to normal view
}) => {
  const MAX_BARS = isAnalysisView ? 16 : 8; // Show 16 bins in analysis view

  const processedData =
    data.length > MAX_BARS
      ? [
          ...data.slice(0, MAX_BARS - 1),
          data.slice(MAX_BARS - 1).reduce((sum, value) => sum + value, 0),
        ]
      : data;

  const processedLabels =
    labels.length > MAX_BARS
      ? [...labels.slice(0, MAX_BARS - 1), "Others"]
      : labels;

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: isAnalysisView, // Enable toolbar only in analysis view
        tools: {
          download: true, // Enable download
          selection: true, // Enable selection
          zoom: true, // Enable zoom
          zoomin: true, // Enable zoom in
          zoomout: true, // Enable zoom out
          pan: true, // Enable pan
          reset: true, // Enable reset
        },
        autoSelected: "zoom", // Default tool selected
      },
      zoom: {
        enabled: true, // Enable zoom functionality
        type: "x", // Enable x-axis zoom
        autoScaleYaxis: true, // Automatically scale the y-axis
      },
      animations: { enabled: true },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          const index = config.dataPointIndex;
          if (index >= 0 && index < processedLabels.length) {
            const selectedLabel = processedLabels[index];
            const selectedValue = processedData[index];
            console.log("Bar Clicked:", { selectedLabel, selectedValue });
            onClick({
              category: selectedLabel,
              name,
              value: selectedValue,
            });
          }
        },
      },
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
      labels: isAnalysisView ? { show: true } : { show: false }, // Show labels in analysis view
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      show: isAnalysisView, // Show y-axis in analysis view
    },
    grid: {
      show: isAnalysisView, // Show grid in analysis view
    },
    colors: ["#3b82f6"],
    tooltip: {
      enabled: true,
      y: {
        formatter: (value) => `${value}`,
      },
    },
  };

  const chartSeries = [
    {
      name: "Count",
      data: processedData,
    },
  ];

  return (
    <div
      className={`relative ${
        isAnalysisView ? "w-[400px] h-[300px]" : "w-[210px] h-[149px]"
      } bg-white rounded-sm shadow-md pt-2 flex items-center justify-center cursor-pointer`}
      onClick={() => {
        const totalValue = processedData.reduce((sum, v) => sum + v, 0);
        console.log("Chart Box Clicked:", {
          category: type || "Category",
          name,
          value: totalValue,
        });
        onClick({
          category: type || "Category",
          name,
          value: totalValue,
        });
      }}
    >
      {/* Title - Rendered only when not in Analysis View */}
      {!isAnalysisView && name && (
        <div className="absolute top-2 left-2">
          <div
            className={`text-xs text-blue-800 bg-blue-100 px-2 py-1 rounded`}
          >
            Number
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
