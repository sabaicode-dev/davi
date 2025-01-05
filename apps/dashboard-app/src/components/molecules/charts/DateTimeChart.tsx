import React from "react";
import Chart from "react-apexcharts";

type BucketData = {
  index: number;
  label: string;
  left_value: string;
  right_value: string;
  count: number;
};

type ChartSelectionData = {
  category: string;
  percentage: number;
  type: string;
  name?: string; // Make name optional
};

interface DateTimeChartProps {
  data: BucketData[]; // Array of bucket data
  name?: string; // Optional name
  onClick: (item: { category: string; name: string; value: number }) => void; // Click handler
  isBig?: boolean; // Determines if the component should render as a detailed view
}

// Process data for normal or detailed views
const processData = (data: BucketData[], showAll: boolean): BucketData[] => {
  return showAll ? data : data.slice(0, 10); // Show all or only the first 10 buckets
};

const DateTimeChart: React.FC<DateTimeChartProps> = ({
  data,
  name = "Date Time Chart",
  onClick,
  isBig = false,
}) => {
  const processedData = processData(data, isBig);

  const chartOptions = {
    chart: {
      type: "area" as const,
      height: isBig ? 400 : 149, // Adjust height for detailed view
      toolbar: { show: isBig },
      animations: { enabled: true },
      events: {
        dataPointSelection: (
          event: any,
          chartContext: any,
          config: { dataPointIndex: number }
        ) => {
          const index = config.dataPointIndex;
          if (index >= 0 && index < processedData.length) {
            const selectedBucket = processedData[index];
            onClick({
              category: name,
              name,
              value: selectedBucket.count,
            });
          }
        },
      },
    },
    stroke: {
      curve: "smooth" as const, // Smooth curve for the line
    },
    xaxis: {
      type: "datetime" as const,
      categories: processedData.map((bucket) => bucket.left_value),
      labels: {
        format: isBig ? "dd MMM yyyy" : undefined, // Show labels only in detailed view
        show: isBig, // Show labels in detailed view
      },
    },
    yaxis: {
      title: {
        text: isBig ? "Count" : "", // Show y-axis title only in detailed view
      },
    },
    tooltip: {
      enabled: true, // Enable tooltip for both normal and detailed views
      x: {
        format: "dd MMM yyyy",
      },
    },
    dataLabels: {
      enabled: isBig, // Only enable data labels in detailed view
    },
    fill: {
      type: "gradient" as const,
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: ["#008FFB"], // Blue line color
  };

  const chartData = {
    labels: processedData.map((bucket) => bucket.label),
    series: [
      {
        name: "Count",
        data: processedData.map((bucket) => bucket.count),
      },
    ],
  };

  if (isBig) {
    // Render detailed view
    return (
      <div className="relative w-[400px] h-[300px] bg-white rounded-sm p-4 flex flex-col justify-center">
        <div className="w-full h-full">
          <Chart
            options={chartOptions}
            series={chartData.series}
            type="area"
            height={400}
          />
        </div>
      </div>
    );
  }

  // Render normal view
  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md p-2 flex flex-col justify-center cursor-pointer"
      onClick={() =>
        onClick({
          category: "DATE_TIME",
          name,
          value: processedData.reduce((sum, bucket) => sum + bucket.count, 0),
        })
      }
    >
      {/* Title */}
      <div className="absolute top-2 left-2">
        <div className="text-yellow-800 text-xs bg-yellow-100 px-2 py-1 rounded">
          DateTime
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-full">
        <Chart
          options={chartOptions}
          series={chartData.series}
          type="area"
          height={145}
        />
      </div>
    </div>
  );
};

export default DateTimeChart;
