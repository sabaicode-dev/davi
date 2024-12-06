import { useState, useCallback } from "react";
import DisplayTable from "./DisplayTable";
import ShowTable from "./ShowTable";

const ParentComponent = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Use useCallback to memorize the callback and prevent unnecessary re-renders
  const handleItemClick = useCallback((index: number) => {
    setSelectedItemId(index); // Update the selected item ID
  }, []);
  const handleChangeIndex = (value: number) => {
    setSelectedIndex(value);
  };
  return (
    <div className="flex space-x-5">
      {/* Pass handleItemClick to DisplayTable */}
      <DisplayTable
        handleItemClicked={handleItemClick}
        selectedItemId={selectedItemId}
        handleChangeIndex={handleChangeIndex}
      />

      {/* Pass selectedItemId to ShowTable */}
      <ShowTable
        selectedItemId={selectedItemId}
        selectedIndex={selectedIndex}
      />
    </div>
  );
};

export default ParentComponent;
