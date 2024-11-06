import React from "react";
import { Category } from "../molecules/charts/Catagory";

// Sample data
const data = [
  { category: "Electronics" },
  { category: "Books" },
  { category: "Clothing" },
  { category: "Electronics" },
  { category: "Books" },
  { category: "Clothing" },
  { category: "Electronics" },
  { category: "Furniture" },
  { category: "Furniture" },
  { category: "Furniture" },
];

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category Analysis</h1>
      <Category data={data} />
    </div>
  );
};

export default App;
