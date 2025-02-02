import React from "react";
import { useNavigate } from "react-router-dom";

interface DataSourceCardProps {
  title: string; // Title of the data source (e.g., MySQL, SQLServer, MongoDB)
  imageSrc: string; // Path to the icon/image for the data source
  bgColor: string; // Background color of the header
  hoverColor: string; // Hover color for the header
  navigatePath: string; // Navigation path for the data source
  type: string;
}

const DataSourceCard: React.FC<DataSourceCardProps> = ({
  title,
  imageSrc,
  bgColor,
  hoverColor,
  navigatePath,
  type,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${navigatePath}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-60 h-full mx-auto border rounded-lg cursor-pointer"
    >
      <div
        className={`${bgColor} cursor-pointer hover:${hoverColor} h-32 px-6 py-3 flex items-center justify-center rounded-tl-lg rounded-tr-lg`}
      >
        <img src={imageSrc} alt={`${title} Icon`} className="w-16" />
      </div>
      <div className="flex justify-between items-center p-1">
        <p className="text-gray-800 text-sm">{title}</p>
        <button className="text-xs border-[1px] rounded-md bg-slate-200 text-gray-500 px-1 py-0.5">
          {type}
        </button>
      </div>
    </div>
  );
};

export default DataSourceCard;
