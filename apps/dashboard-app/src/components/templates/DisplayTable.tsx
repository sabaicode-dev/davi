import React from "react";
import BookIcon from "@/public/images/Book-icon.png";
interface ListTable {
  id: number;
  table: string;
}

interface Props {
  listTable: ListTable[];
  setSelectedTable: (item: ListTable) => void;
}

const DisplayTable: React.FC<Props> = ({ listTable, setSelectedTable }) => {
  return (
    <div className="container w-[15%] h-[730px] space-y-2 border border-[#C4C1D8] rounded-lg">
      <header className="text-start py-5 font-medium text-[20px] flex justify-start ml-5">
        Display Table
      </header>
      <ul className="space-y-3 font-medium text-[14px] ml-5">
        {listTable.map((item) => (
          <div
            className="flex justify-start cursor-pointer"
            key={item.id}
            onClick={() => setSelectedTable(item)}
          >
            <img src={BookIcon} alt="" width={24} />
            <p className="ml-2">{item.table}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DisplayTable;
