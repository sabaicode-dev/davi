import React from "react";
import Category from "../components/molecules/charts/Catagory";
import Number from "../components/molecules/charts/Number";
import Boolean from "../components/molecules/charts/Boolean";
import DateTimeChart from "../components/molecules/charts/DateTimeChart";
import { div } from "framer-motion/client";

interface ColumnMetadata {
  key: string;
  name: string;
  description?: string;
  table_column_info: {
    type: "STRING" | "NUMERIC" | "BOOLEAN" | "DATE_TIME";
    order?: number;
    original_type?: string;
    extended_type: string;
  };
  table_column_metrics: {
    total_count?: number;
    non_null_count?: number;
    valid_count?: number;
    string_metrics?: {
      counts: { key: string; value: number }[];
      most_common_value?: string;
      most_common_value_count?: number;
      unique_value_count?: number;
    };
    numeric_metrics?: {
      histogram: { range: string; count: number }[];
    };
    boolean_metrics?: {
      true_count: number;
      false_count: number;
    };
    date_time_metrics?: {
      mean: string;
      minimum: string;
      maximum: string;
      histogram: {
        buckets: {
          index: number;
          label: string;
          left_value: string;
          right_value: string;
          count: number;
        }[];
      };
    };
  };
}

interface ChartSelectionData {
  category: string;
  percentage: number;
  type: string;
  name?: string;
}

export const renderChart = (
  columnMetadata: ColumnMetadata,
  onChartSelect?: (
    metadata: ColumnMetadata,
    chartData: ChartSelectionData
  ) => void
): JSX.Element | null => {
  const { table_column_info, table_column_metrics, name } = columnMetadata;

  if (!table_column_info || !table_column_info.type) {
    console.warn("Invalid metadata or unsupported type:", columnMetadata);
    return <p>No Chart</p>;
  }

  const { type } = table_column_info;

  switch (type) {
    case "STRING": {
      const stringMetrics = table_column_metrics?.string_metrics;
      const totalCount = table_column_metrics?.total_count || 0;

      if (!totalCount) {
        return <p>No Chart</p>;
      }

      return (
        <Category
          data={
            stringMetrics?.counts.map((item) => ({
              category: item.key,
              value: item.value,
            })) || []
          }
          name={name || "Unknown Header"}
          onClick={(item) => {
            if (onChartSelect) {
              const percentage = (item.value / totalCount) * 100;
              onChartSelect(columnMetadata, {
                category: columnMetadata.key,
                name: name || "Unknown Header",
                percentage,
                type: "STRING",
              });
            }
          }}
        />
      );
    }

    case "NUMERIC": {
      const numericMetrics = table_column_metrics?.numeric_metrics as any;
      const histogramBuckets = numericMetrics?.histogram.buckets;

      if (Array.isArray(histogramBuckets) && histogramBuckets.length > 0) {
        const data = histogramBuckets.map((bucket) => bucket.count || 0);
        const labels = histogramBuckets.map(
          (bucket) => bucket.range || "Unknown"
        );

        return (
          <Number
            data={data}
            labels={labels}
            name={name || "Numeric Data"}
            type="NUMERIC"
            onClick={({ category, name, value }) => {
              console.log("Chart Clicked:", { category, name, value });
              if (onChartSelect) {
                const percentage =
                  (value / data.reduce((sum, v) => sum + v, 0)) * 100;

                onChartSelect(columnMetadata, {
                  category: columnMetadata.key,
                  percentage,
                  type: "NUMERIC",
                  name,
                });
              } else {
                console.error("Metadata is not available for this chart");
              }
            }}
          />
        );
      } else {
        console.warn("Invalid or missing histogram buckets:", histogramBuckets);
        return <p>No Chart Data</p>;
      }
    }

    case "BOOLEAN": {
      const booleanMetrics = table_column_metrics?.boolean_metrics;

      if (booleanMetrics) {
        const booleanData = {
          true: booleanMetrics.true_count || 0,
          false: booleanMetrics.false_count || 0,
        };

        return (
          <Boolean
            data={booleanData}
            title={type} // Use `type` as the title
            onClick={({ label, value }) => {
              if (onChartSelect) {
                const total = booleanMetrics.true_count + booleanMetrics.false_count;
                const percentage = (value / total) * 100;

                onChartSelect(columnMetadata, {
                  category: columnMetadata.key,
                  name: label, // Use label (True/False)
                  percentage,
                  type: "BOOLEAN",
                });
              }
            }}
          />
        );
      }
      return <p>No Boolean Data Available</p>;
    }

    case "DATE_TIME": {
      const dateTimeMetrics = table_column_metrics?.date_time_metrics;
      const histogramBuckets = dateTimeMetrics?.histogram?.buckets;

      if (Array.isArray(histogramBuckets) && histogramBuckets.length > 0) {
        return (
          <DateTimeChart
            data={histogramBuckets.map((bucket) => ({
              index: bucket.index,
              label: bucket.label,
              left_value: bucket.left_value,
              right_value: bucket.right_value,
              count: bucket.count,
            }))}
            name={name || "Date Time Distribution"}
            onClick={({ category, name, value }) => {
              if (onChartSelect) {
                onChartSelect(columnMetadata, {
                  category: columnMetadata.key,
                  percentage: (value / histogramBuckets.length) * 100,
                  type: "DATE_TIME",
                  name,
                });
              }
            }}
          />
        );
      } else {
        console.warn("Invalid or missing histogram buckets:", histogramBuckets);
        return <p>No Date Time Data Available</p>;
      }
    }

    default:
      console.warn("Unsupported chart type:", type);
      return <>
      <div className="w-[210px] h-[149px] bg-red-500 flex items-center justify-center">
        No chart Thanks!!
      </div>
      </>;
  }
};
