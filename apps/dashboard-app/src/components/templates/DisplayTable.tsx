import { useLocation } from "react-router-dom";
import BookIcon from "@/public/images/Book-icon.png";

interface DisplayTableProps {
  handleItemClicked: (index: number) => void;
  selectedItemId: number | null;
  handleCheckClicked: (index: number) => void;
  selectedCheckedFiles: number[]; // Use an array to store multiple selected files
}

const DisplayTable = ({
  handleItemClicked,
  selectedItemId,
  handleCheckClicked,
  selectedCheckedFiles,
}: DisplayTableProps) => {
  const location = useLocation();
  const scrapedData = location.state?.scrapedData.filename; // Retrieve scraped data

  const handleClick = (item: any) => {
    handleItemClicked(item); // Call the parent function if needed
  };

  const handleCheckboxChange = (itemIndex: number) => {
    handleCheckClicked(itemIndex); // This function will be passed from the parent
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
                onClick={() => handleClick(item)} // Trigger onItemClick and log the item data
              >
                <input
                  type="checkbox"
                  className="size-4 border-[#3e3c46]"
                  checked={selectedCheckedFiles.includes(item)} // Check if this item index is in the selected files array
                  onChange={() => handleCheckboxChange(item)} // Trigger on checkbox change
                />
                <img src={BookIcon} alt="" width={24} />
                <p>
                  {item.slice(0, 2).concat("...").concat(item.slice(30, 32))}
                </p>
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
