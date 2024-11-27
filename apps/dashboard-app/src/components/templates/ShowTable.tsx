interface ShowTableProps {
  selectedTable: string | null;
}

const ShowTable = ({ selectedTable }: ShowTableProps) => {
  return (
    <div className="w-full ml-5 border border-[#C4C1D8] rounded-lg">
      <div className="p-5 h-[800px] overflow-hidden">
        <header className="font-medium text-[18px] mb-4">
          {selectedTable ? selectedTable : "No Table Selected"}
        </header>
        <div className="flex justify-center items-center text-center h-full text-[#BDBBCB]">
          {selectedTable ? `` : "No Table selected for preview"}
        </div>
      </div>
    </div>
  );
};

export default ShowTable;
