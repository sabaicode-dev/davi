import React from "react";
import Category from "../components/molecules/charts/Catagory";
import UniqueValue from "../components/molecules/charts/UniqueValue";

type DataItem = { category: string; value: number };

interface ColumnMetadata {
  key: string;
  name: string;
  description?: string;
  table_column_info: {
    type: "STRING" | "NUMERIC" | "BOOLEAN" | "HISTOGRAM";
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
}

export const renderChart = (
  columnMetadata: ColumnMetadata,
  onChartSelect?: (metadata: ColumnMetadata, chartData: ChartSelectionData) => void
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

      // Check if the most common value is 100%
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
                  type: "UniqueValue"
                });
              }
            }}
          />
        );
      }

      // Render Category chart if the most common value is not 100%
      return (
        <Category
          data={
            stringMetrics?.counts.map((item) => ({
              category: item.key,
              value: item.value,
            })) || []
          }
          title={name || "Category"}
          type={type}
          onClick={(item) => {
            if (onChartSelect) {
              onChartSelect(columnMetadata, {
                category: item.category,
                percentage: item.percentage,
                type: "STRING"
              });
            }
          }}
        />
      );
    }

    default:
      console.warn("Unsupported chart type:", type);
      return <p>No Chart</p>;
  }
};