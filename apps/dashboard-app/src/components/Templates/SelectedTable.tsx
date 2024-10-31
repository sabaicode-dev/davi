import ShowTable from "@/src/components/Templates/ShowTable";
import { useState } from "react";
import DisplayTable from "@/src/components/Templates/DisplayTable";
const initialList = [
  { id: 1, table: "table1" },
  { id: 2, table: "table2" },
  { id: 3, table: "table3" },
  { id: 4, table: "table4" },
  { id: 5, table: "table5" },
];
interface ListTable {
  id: number;
  table: string;
}
const SelectedTable = () => {
  const [listTable] = useState(initialList); // Fixed list

  const [selectedTable, setSelectedTable] = useState<ListTable | null>(null);
  return (
    <div className="flex mx-5 my-5">
      <DisplayTable listTable={listTable} setSelectedTable={setSelectedTable} />
      <ShowTable selectedTable={selectedTable} />
    </div>
  );
};

export default SelectedTable;
