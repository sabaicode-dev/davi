import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { XIcon } from "../../atoms/icons/Icon";
import Boolean from "../charts/Boolean";
import Category from "../charts/Catagory";
import Number from "../charts/Number";
import DateTimeChart from "../charts/DateTimeChart";

type ChartSelectionData = {
  name?: string;
  category: string;
  percentage: number;
  type?: string;
};

interface SaveDescriptionPayload {
  metadata_key: string;
  description: string;
}

type ChartMetadata = {
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
};

type AnalysisProps = {
  selectedData: ChartSelectionData | null;
  onClose: () => void;
  metadata: ChartMetadata[];
  name?: string;
};

const Analysis: React.FC<AnalysisProps> = ({
  selectedData,
  onClose,
  metadata,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedKey, setSelectedKey] = useState(""); // Tracks the selected metadata key
  const [localMetadata, setLocalMetadata] = useState(metadata); // Local state for metadata
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedData) {
      const matchingMetadata = metadata.find(
        (meta) => meta.key === selectedData.category
      );

      if (matchingMetadata) {
        setSelectedKey(matchingMetadata.key);

        // Load description from localStorage
        const storedDescriptions =
          JSON.parse(localStorage.getItem("descriptions") || "{}");
        const savedDescription = storedDescriptions[matchingMetadata.key];

        setDescription(savedDescription || matchingMetadata.description || "");
      }
    }
  }, [selectedData, metadata]);

  const saveDescription = async (): Promise<void> => {
    if (!selectedKey) {
      console.error("Metadata key is not provided.");
      return;
    }

    const payload: SaveDescriptionPayload = {
      metadata_key: selectedKey,
      description,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/metafile/update-description/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.message === "Description updated successfully") {
        // Update local metadata
        setLocalMetadata((prevMetadata) =>
          prevMetadata.map((meta) =>
            meta.key === selectedKey ? { ...meta, description } : meta
          )
        );

        // Save description to localStorage
        const storedDescriptions =
          JSON.parse(localStorage.getItem("descriptions") || "{}");
        storedDescriptions[selectedKey] = description;
        localStorage.setItem("descriptions", JSON.stringify(storedDescriptions));

        setIsEditing(false);
      } else {
        console.error("Failed to update description on the server.");
      }
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const chartName =
    selectedData?.name ||
    localMetadata.find((meta) => meta.key === selectedData?.category)?.name ||
    "Unknown Header";

  const matchingMetadata = localMetadata.find(
    (meta) => meta.key === selectedKey
  );

  return (
    <div
      ref={sidebarRef}
      className="fixed right-5 top-16 bottom-0 w-[428px] h-screen bg-white p-5 shadow-2xl overflow-y-auto z-20"
    >
      <button
        onClick={onClose}
        className="float-right text-2xl text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <XIcon />
      </button>

      <h2 className="text-xl font-semibold mb-4">{chartName}</h2>

      <div className="flex gap-3 mb-5">
        <div className="bg-blue-300 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Rows</p>
          <p className="text-lg font-bold">
            {matchingMetadata?.table_column_metrics?.total_count || 0}
          </p>
        </div>
        <div className="bg-orange-400 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Empty Values</p>
          <p className="text-lg font-bold">
            {(matchingMetadata?.table_column_metrics?.total_count || 0) -
              (matchingMetadata?.table_column_metrics?.non_null_count || 0)}
          </p>
        </div>
        <div className="bg-purple-300 rounded-lg p-3 text-center flex-1">
          <p className="text-sm text-gray-700">Unique Values</p>
          <p className="text-lg font-bold">
            {matchingMetadata?.table_column_metrics?.string_metrics
              ?.unique_value_count || 0}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-medium mb-3">Description</h3>
        <div className="flex items-start px-1">
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap flex-grow overflow-hidden break-words max-w-full">
              {description || "No description available."}
            </p>
          )}
          <button
            onClick={() => {
              if (isEditing) {
                saveDescription();
              } else {
                setIsEditing(true);
              }
            }}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            {isEditing ? (
              <AiOutlineCheck size={20} />
            ) : (
              <AiOutlineEdit size={20} />
            )}
          </button>
        </div>
      </div>
      {/* Distribution Bar Chart */}
      <div className="mt-5">
        <h3 className="text-lg font-medium mb-3">Distribution</h3>
        <div className=" rounded-lg flex items-center justify-center">
          {(() => {
            // Determine the chart type dynamically
            switch (selectedData?.type) {
              case "NUMERIC":
                const numericMetrics = matchingMetadata?.table_column_metrics
                  ?.numeric_metrics as any;

                const histogram = numericMetrics?.histogram?.buckets;

                if (Array.isArray(histogram)) {
                  return (
                    <Number
                      data={histogram.map((bucket) => bucket.count)}
                      labels={histogram.map((bucket) => bucket.label)}
                      name={selectedData.name || "Numeric Distribution"}
                      type="NUMERIC"
                      onClick={() => {}}
                      isAnalysisView={true}
                    />
                  );
                } else {
                  return <p>No Numeric Data Available</p>;
                }

              case "STRING":
                const stringCounts =
                  matchingMetadata?.table_column_metrics?.string_metrics
                    ?.counts;

                if (Array.isArray(stringCounts)) {
                  return (
                    <Category
                      data={stringCounts.map((item) => ({
                        category: item.key,
                        value: item.value,
                      }))}
                      name={selectedData.name || "Category Distribution"}
                      type="STRING"
                      onClick={() => {}}
                      isBig={true}
                    />
                  );
                } else {
                  return <p>No String Data Available</p>;
                }

              case "DATE_TIME":
                const dateTimeBuckets =
                  matchingMetadata?.table_column_metrics?.date_time_metrics
                    ?.histogram?.buckets;

                if (Array.isArray(dateTimeBuckets)) {
                  return (
                    <DateTimeChart
                      data={dateTimeBuckets.map((bucket) => ({
                        index: bucket.index,
                        label: bucket.label,
                        left_value: bucket.left_value,
                        right_value: bucket.right_value,
                        count: bucket.count,
                      }))}
                      name={selectedData.name || "Date Time Distribution"}
                      isBig={true}
                      onClick={({ category, name, value }) => {
                        ({
                          category,
                          name,
                          value,
                        });
                      }}
                    />
                  );
                } else {
                  return <p>No Date Time Data Available</p>;
                }

              case "BOOLEAN": {
                const booleanMetrics =
                  matchingMetadata?.table_column_metrics?.boolean_metrics;

                if (booleanMetrics) {
                  const booleanData = {
                    true: booleanMetrics.true_count || 0,
                    false: booleanMetrics.false_count || 0,
                  };

                  return (
                    <Boolean
                      data={booleanData}
                      title={selectedData.type}
                      isBig={true}
                      onClick={({ category, type, value }) => {
                        console.log({ category, type, value });
                      }}
                    />
                  );
                }
                return <p>No Boolean Data Available</p>;
              }

              default:
                return <p>Unsupported Chart Type</p>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
