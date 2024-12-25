import React from "react";
import Category from "../components/molecules/charts/Catagory";
import UniqueValue from "../components/molecules/charts/UniqueValue";
import Number from "../components/molecules/charts/Number";
import Boolean from "../components/molecules/charts/Boolean";

interface ColumnMetadata {
  key: string;
  name: string;
  description?: string;
  table_column_info: {
    type: "STRING" | "NUMERIC" | "BOOLEAN";
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
  };
}

interface ChartSelectionData {
  category: string;
  percentage: number;
  type: string;
  name: string; // Add this property
}

interface HistogramBucket {
  index: number;
  label: string;
  left_value: number;
  right_value: number;
  count: number;
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
      const uniqueValueCount = stringMetrics?.unique_value_count || 0;
      const totalCount = table_column_metrics?.total_count || 0;

      if (!totalCount) {
        return <p>No Chart</p>;
      }

      const mostCommonValuePercentage =
        ((stringMetrics?.most_common_value_count || 0) / totalCount) * 100;

      if (mostCommonValuePercentage === 100) {
        return (
          <UniqueValue
            uniqueValueCount={uniqueValueCount}
            totalCount={totalCount}
            onClick={() => {
              if (onChartSelect) {
                onChartSelect(columnMetadata, {
                  category: name,
                  percentage: mostCommonValuePercentage,
                  type: "UniqueValue",
                  name: name || "Unknown Header", // Add `name` for clarity
                });
              }
            }}
          />
        );
      }

      return (
        <Category
          data={
            stringMetrics?.counts.map((item) => ({
              category: item.key,
              value: item.value,
            })) || []
          }
          name={name || "Unknown Header"} // Pass the name property here
          onClick={(item) => {
            if (onChartSelect) {
              const percentage = (item.value / totalCount) * 100;
              onChartSelect(columnMetadata, {
                category: columnMetadata.key, // Pass the `key` to identify metadata
                name: name || "Unknown Header", // Add `name` for clarity
                percentage,
                type: "STRING",
              });
            }
          }}
        />
      );
    }

    case "NUMERIC": {
      const numericMetrics = table_column_metrics?.numeric_metrics;
      const histogramBuckets = numericMetrics?.histogram?.buckets;
    
      if (Array.isArray(histogramBuckets) && histogramBuckets.length > 0) {
        const data = histogramBuckets.map((bucket) => bucket.count || 0);
        const labels = histogramBuckets.map(
          (bucket) => bucket.label || "Unknown"
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
    
                // Pass columnMetadata.key instead of category
                onChartSelect(columnMetadata, {
                  category: columnMetadata.key, // Use columnMetadata.key
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
        const data = {
          true: booleanMetrics.true_count || 0,
          false: booleanMetrics.false_count || 0,
        };

        return (
          <Boolean
            data={data}
            title={name || "Boolean Data"}
            onClick={({ label, value }) => {
              if (onChartSelect) {
                onChartSelect(columnMetadata, {
                  category: label,
                  percentage: (data.true / value) * 100, // Example: true percentage
                  type: "BOOLEAN",
                  name: name || "Unknown Header", // Add `name` for clarity
                });
              }
            }}
          />
        );
      }

      return <p>No Boolean Data Available</p>;
    }

    default:
      console.warn("Unsupported chart type:", type);
      return <p>No Chart</p>;
  }
};
