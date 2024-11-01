import React from "react";
import { Category } from '../Catagory'; // Adjust the import path as needed

const CategoryMock: React.FC = () => {
  const sampleData = [
    { category: "Fruits" },
    { category: "Vegetables" },
    { category: "Fruits" },
    { category: "Dairy" },
    { category: "Fruits" },
    { category: "Vegetables" },
    { category: "Meat" },
    { category: "Bakery" },
  ];

  return (
    <div className="app-container p-2 flex w-64">
      <Category data={sampleData} />
    </div>
  );
};

export default CategoryMock;
