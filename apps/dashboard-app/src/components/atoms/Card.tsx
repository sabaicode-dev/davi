import React from "react";
import FileIcon from "@/public/images/file.png";
import Button from "./Button";
import { DeleteIcon } from "./icons/Icon";
import { useNavigate } from "react-router-dom";
interface CardProps {
  index: number;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ index, onDelete }) => {
  const navigate = useNavigate();
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
          onClick={() => navigate("/")}
          className="font-medium text-[14px] cursor-pointer w-[95%]"
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
      </div>
    </div>
  );
};

export default Card;
