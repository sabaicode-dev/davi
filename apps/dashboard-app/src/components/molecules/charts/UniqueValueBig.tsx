import React from "react";

type UniqueValueProps = {
  value: number;
  total: number;
};

const UniqueValueBig: React.FC<UniqueValueProps> = ({ value, total}) => {
  const percentage = ((value / total) * 100).toFixed(2);

  return (
    <div
      className="relative w-[400px] h-[300px] bg-white rounded-sm  p-4 flex flex-col justify-center items-center  "
    >
      {/* Unique Value Text */}
      <p className="text-lg font-medium text-gray-800">
        {value} unique value
      </p>
    </div>
  );
};

export default UniqueValueBig;
