import DisplayTable from "../templates/DisplayTable";
import ShowTable from "../templates/ShowTable";
import { useState } from "react";
export default function SelectedTable() {
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableSelection = (tableName: any) => {
    setSelectedTable(tableName);
  };
  return (
    <div className="flex w-auto h-full pt-2">
      {/* DisplayTable component handles table selection */}
      <DisplayTable onSelectTable={handleTableSelection} />

      {/* ShowTable component displays selected table */}
      <ShowTable selectedTable={selectedTable} />
    </div>
  );
}
