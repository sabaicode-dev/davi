import React from "react";

type UniqueValueProps = {
  value: number;
  total: number;
  onClick: () => void;
};

const UniqueValue: React.FC<UniqueValueProps> = ({ value, total, onClick }) => {
  const percentage = ((value / total) * 100).toFixed(2);

  return (
    <div
      className="relative w-[210px] h-[149px] bg-white rounded-sm shadow-md p-4 flex flex-col justify-center items-center cursor-pointer "
      onClick={onClick}
    >
      {/* Top-right icon */}
      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-red-600 text-lg font-bold">!</span>
      </div>

      {/* Unique Value Text */}
      <p className="text-lg font-medium text-gray-800">
        {value} unique value
      </p>
    </div>
  );
};

export default UniqueValue;
