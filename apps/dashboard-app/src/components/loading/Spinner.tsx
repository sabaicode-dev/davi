import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <svg className="animate-spin h-48 w-4h-48 mr-3" viewBox="0 0 24 24"></svg>
    </div>
  );
};

export default Spinner;
