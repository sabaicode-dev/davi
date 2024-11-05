import React from "react";
import FileIcon from "@/public/images/file.png";
import Button from "./Button";
import { DeleteIcon } from "./icons/Icon";
interface CardProps {
  index: number;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ index, onDelete }) => {
  return (
    <div className="container w-full bg-[#EBF1FF] p-5 flex space-x-10 rounded-lg px-10">
      <div className="space-x-5 flex justify-center items-center text-center text-[18px]">
        <span>#{index + 1}</span>
        <span>|</span>
        <span className="bg-[#F4EBFF] rounded-full w-10 h-10 flex justify-center items-center text-center">
          <img src={FileIcon} alt="File Icon" width={20} />
        </span>
      </div>
      <div className="w-full flex justify-between">
        <div
          onClick={() => alert(`Card ${index + 1} has been Clicked`)}
          className="font-medium text-[14px] cursor-pointer"
        >
          <p>Tech requirements.csv</p>
          <p>200 KB</p>
        </div>
        <Button
          type="button"
          onClick={onDelete}
          children={<DeleteIcon />}
          color="none"
          className="text-red-500 !bg-transparent"
        />
        {/* <button
          type="button"
          onClick={onDelete}
          className="flex justify-center items-center text-red-500"
          
        >
          <DeleteIcon/>
        </button> */}
      </div>
    </div>
  );
};

export default Card;
