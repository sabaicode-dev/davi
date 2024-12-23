import React from "react";

type UniqueValueProps = {
  uniqueValueCount: number; // Backend-provided unique value count
  totalCount: number; // Total count of the column
  onClick: () => void; // Callback on click
};

const UniqueValue: React.FC<UniqueValueProps> = ({
  uniqueValueCount,
  totalCount,
  onClick,
}) => {
  const percentage = uniqueValueCount * 100;

  return (
    <div
      className="relative w-[210px] h-[149px]  bg-white rounded-sm shadow-md p-4 flex flex-col justify-center items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-red-600 text-lg font-bold">!</span>
      </div>
      <p className="text-sm font-medium text-gray-800">
        {uniqueValueCount} unique values ({percentage}%)
      </p>
    </div>
  );
};

export default UniqueValue;
