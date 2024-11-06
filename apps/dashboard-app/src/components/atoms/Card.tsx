import React from "react";
import FileIcon from "@/public/images/file.png";
import TrashBin from "@/public/images/trash-01.png";

interface CardProps {
  index: number;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ index, onDelete }) => {
  return (
    <div className="w-full bg-[#EBF1FF] p-5 flex space-x-10 rounded-lg">
      {/* Left Section */}
      <div className="space-x-5 flex justify-center items-center text-center text-[18px]">
        <span>#{index + 1}</span>
        <span>|</span>
        <span className="bg-[#F4EBFF] rounded-full w-10 h-10 flex justify-center items-center">
          <img src={FileIcon} alt="File Icon" width={20} />
        </span>
      </div>
      
      {/* Middle Section */}
      <div className="flex justify-between w-full">
        <div
          onClick={() => alert(`Card ${index + 1} has been Clicked`)}
          className="font-medium text-[14px] cursor-pointer"
        >
          <p>Tech requirements.csv</p>
          <p>200 KB</p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="flex justify-center items-center"
        >
          <img src={TrashBin} alt="Delete Icon" width={24} />
        </button>
      </div>
    </div>
  );
};

export default Card;
