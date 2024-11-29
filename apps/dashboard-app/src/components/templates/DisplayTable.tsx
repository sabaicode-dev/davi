import { useState } from "react";
import BookIcon from "@/public/images/Book-icon.png";
import { DisplayTableMock } from "@/src/data/MockUp";

interface DisplayTableProps {
  onSelectTable: (tableName: string) => void;
}

const DisplayTable = ({ onSelectTable }: DisplayTableProps) => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleItemClick = (id: any, tableName: any) => {
    setSelectedItemId(id);
    onSelectTable(tableName);
  };

  return (
    <div className=" h-[800px] space-y-3 border border-[#C4C1D8] rounded-lg py-3">
      <header className="text-center font-medium text-[20px] w-[200px]">
        <h1> Display Table</h1>
      </header>
      <ul className="space-y-3 font-medium text-[14px]">
        {DisplayTableMock.map((item) => (
          <div
            key={item.id}
            className={`flex items-center text-center cursor-pointer space-x-1 px-10 ${
              selectedItemId === item.id ? "bg-[#E6EDFF]" : ""
            }`}
            onClick={() => handleItemClick(item.id, item.table)}
          >
            <input type="checkbox" className="size-4 border-[#afaac7]" />
            <img src={BookIcon} alt="" width={24} />
            <p>{item.table}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DisplayTable;
