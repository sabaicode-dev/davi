import React, { useEffect, useState } from "react";
import Number from "../molecules/charts/Number";
import Category from "../molecules/charts/Catagory";
import Boolean from "../molecules/charts/Boolean";
import Analysis from "../molecules/descraptive/Analysis";
import UniqueValue from "../molecules/charts/UniqueValue";

const TestUI: React.FC = () => {
  const [numberData, setNumberData] = useState<number[]>([]);
  const [numberLabels, setNumberLabels] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<
    { category: string; percentage: number }[]
  >([]);
  const [booleanData, setBooleanData] = useState<{
    true: number;
    false: number;
  }>({ true: 0, false: 0 });
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedData, setSelectedData] = useState<{
    category: string;
    percentage: number;
  } | null>(null);

  const handleBoxClick = (dataPoint: {
    category: string;
    percentage: number;
  }) => {
    setSelectedData(dataPoint);
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
    setSelectedData(null);
  };

  useEffect(() => {
    // Simulated API Response
    const apiResponse = [
      {
        type: "OBJECT_TYPE_TABLE_COLUMN",
        key: "6bfb1786f7364b698ee202ba66135257",
        name: "main_category",
        table_column_metrics: {
          string_metrics: {
            counts: [
              { key: "Electronics", value: 500 },
              { key: "Furniture", value: 300 },
              { key: "Clothing", value: 200 },
            ],
          },
        },
      },
      {
        type: "OBJECT_TYPE_TABLE_COLUMN",
        key: "6a9a9a34b74d4b61b15b9fe312786d65",
        name: "discount_price",
        table_column_metrics: {
          string_metrics: {
            counts: [
              { key: "₹499", value: 95 },
              { key: "₹399", value: 39 },
              { key: "₹299", value: 34 },
              { key: "₹599", value: 22 },
              { key: "₹499", value: 75 },
              { key: "₹399", value: 39 },
              { key: "₹299", value: 34 },
              { key: "₹599", value: 92 },
            ],
          },
        },
      },
      {
        type: "OBJECT_TYPE_TABLE_COLUMN",
        key: "boolean_column",
        name: "boolean_column",
        table_column_metrics: {
          string_metrics: {
            counts: [
              { key: "True", value: 60 },
              { key: "True", value: 60 },
              { key: "True", value: 60 },
              { key: "True", value: 60 },
              { key: "True", value: 60 },
              { key: "True", value: 60 },
              { key: "False", value: 40 },
              { key: "True", value: 60 },
              { key: "False", value: 40 },
            ],
          },
        },
      },
    ];

    // Process data for Number component
    const numberColumn = apiResponse.find(
      (item) => item.key === "6a9a9a34b74d4b61b15b9fe312786d65"
    );
    const numberCounts =
      numberColumn?.table_column_metrics?.string_metrics?.counts || [];
    const limitedCounts = numberCounts.slice(0, 8);
    while (limitedCounts.length < 8) {
      limitedCounts.push({
        key: `Extra ${limitedCounts.length + 1}`,
        value: 0,
      });
    }
    const labels = limitedCounts.map((item: { key: string }) => item.key);
    const values = limitedCounts.map((item: { value: number }) => item.value);
    setNumberLabels(labels);
    setNumberData(values);

    // Process data for Category component
    const categoryColumn = apiResponse.find(
      (item) => item.key === "6bfb1786f7364b698ee202ba66135257"
    );
    const categoryCounts =
      categoryColumn?.table_column_metrics?.string_metrics?.counts || [];
    const totalCategoryCount = categoryCounts.reduce(
      (acc: number, item: { value: number }) => acc + item.value,
      0
    );
    const processedCategories = categoryCounts.map(
      (item: { key: string; value: number }) => ({
        category: item.key,
        percentage: +((item.value / totalCategoryCount) * 100).toFixed(1),
      })
    );
    setCategoryData(processedCategories);

    // Process data for Boolean component
    const booleanColumn = apiResponse.find(
      (item) => item.key === "boolean_column"
    );
    const booleanCounts =
      booleanColumn?.table_column_metrics?.string_metrics?.counts || [];
    const booleanProcessed = {
      true:
        booleanCounts.find((item: { key: string }) => item.key === "True")
          ?.value || 0,
      false:
        booleanCounts.find((item: { key: string }) => item.key === "False")
          ?.value || 0,
    };
    setBooleanData(booleanProcessed);
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-row justify-center items-center gap-10 bg-gray-50">
        {/* Number Component */}
        <div>
          <Number
            data={numberData}
            labels={numberLabels}
            onClick={() =>
              handleBoxClick({ category: "Number Data", percentage: 50 })
            } // Example click
          />
        </div>

        {/* Category Component */}
        <div>
          <Category
            data={categoryData}
            onClick={(item) =>
              handleBoxClick({
                category: item.category,
                percentage: item.percentage,
              })
            }
          />
        </div>

        {/* Boolean Component */}
        <div>
          <Boolean
            data={booleanData}
            title="Boolean"
            onClick={() =>
              handleBoxClick({ category: "Boolean Data", percentage: 60 })
            } // Example click
          />
        </div>

        <div>
          <UniqueValue
            value={51} // Example unique value count
            total={500} // Example total count
            onClick={() =>
              handleBoxClick({ category: "Unique Value Data", percentage: 51 })
            }
          />
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && selectedData && (
        <Analysis selectedData={selectedData} onClose={closeSidebar} />
      )}
    </div>
  );
};

export default TestUI;
