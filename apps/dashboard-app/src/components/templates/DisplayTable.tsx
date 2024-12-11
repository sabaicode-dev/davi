import { useLocation } from "react-router-dom";
import BookIcon from "@/public/images/Book-icon.png";

interface DisplayTableProps {
  handleItemClicked: (index: number) => void;
  selectedItemId: number | null;
  handleChangeIndex: (value: number) => void;
}

const DisplayTable = ({
  handleItemClicked,
  selectedItemId,
  handleChangeIndex,
}: DisplayTableProps) => {
  const location = useLocation();
  const scrapedData = location.state?.scrapedData.filename; // Retrieve scraped data
  const handleClick = (item: any, index: number) => {
    handleItemClicked(item); // Call the parent function if needed
    handleChangeIndex(index + 1);
  };
  return (
    <div className="h-[700px] space-y-3 border border-[#C4C1D8] rounded-lg py-3">
      <header className="text-center font-medium text-[20px] w-[200px]">
        <h1>Display Table</h1>
      </header>
      <div className="h-[640px] overflow-y-auto">
        <ul className="space-y-3 font-medium text-[14px]">
          {scrapedData && scrapedData.length > 0 ? (
            scrapedData.map((item: any, index: number) => (
              <div
                key={index}
                className={`flex items-center text-center cursor-pointer space-x-1 px-10 ${
                  selectedItemId === item ? "bg-[#E6EDFF]" : ""
                }`}
                onClick={() => handleClick(item, index)} // Trigger onItemClick and log the item data
              >
                <input
                  type="checkbox"
                  className="size-4 border-[#afaac7]"
                  checked={selectedItemId === item}
                  onChange={() => handleItemClicked(item)} // Trigger onItemClick on checkbox change
                />
                <img src={BookIcon} alt="" width={24} />
                <p>Table {index + 1}</p> {/* Dynamically render Table number */}
              </div>
            ))
          ) : (
            <p className="flex justify-center">No data available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DisplayTable;
