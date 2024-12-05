import React from "react";
import { SaveVisualizeCard } from "./SaveVisualizeCard";

const mockItems = [
  { id: "1", title: "Tech requirements" },
  { id: "2", title: "Zendo employee" },
  { id: "3", title: "AVG sell" },
];

export const VisulizeCard = () => {
  const handleSave = () => {
    console.log("Saving...");
  };

  const handleSaveNew = () => {
    console.log("Saving as new...");
  };

  const handleClose = () => {
    console.log("Closing...");
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <SaveVisualizeCard
        items={mockItems}
        onSave={handleSave}
        onSaveNew={handleSaveNew}
        onClose={handleClose}
      />
    </div>
  );
};
