interface ShowTableProps {
  selectedTable: { table: string } | null;
}

const ShowTable = ({ selectedTable }: ShowTableProps) => {
  return (
    <div className="container w-full ml-5 border border-[#C4C1D8] rounded-lg">
      <div className="p-10 h-[695px] overflow-hidden">
        {selectedTable ? (
          <>
            <header className="font-medium text-[18px] mb-4">
              {selectedTable.table}
            </header>
            <div>
              {selectedTable.table === "table1" ? (
                <div> Table 1</div>
              ) : selectedTable.table === "table2" ? (
                <div> Table 2</div>
              ) : selectedTable.table === "table3" ? (
                <div> Table 3</div>
              ) : selectedTable.table === "table4" ? (
                <div> Table 4</div>
              ) : selectedTable.table === "table5" ? (
                <div> Table 5</div>
              ) : (
                <div>Unknown Table Selected</div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center text-center h-full text-[#BDBBCB]">
            No Table selected for preview
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTable;
