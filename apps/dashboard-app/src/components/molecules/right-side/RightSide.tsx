import React, { useState } from "react";
import PieChartIcon from "@/public/images/right-side-icons/pie_chart.png";
import BarChartIcon from "@/public/images/right-side-icons/bar_chart.png";
import LineChartIcon from "@/public/images/right-side-icons/line_chart.png";
import Button from "../../atoms/Button";
import { BsX } from "react-icons/bs";
import {BarChartTest} from "../charts/BarChart";
import { LineChartTest } from "../charts/LineChart";
import { PieChartTest } from "../charts/PieChart";

// Define the props interface for RightSide
interface RightSideProps {
  onClose: () => void;
}

const RightSide: React.FC<RightSideProps> = ({ onClose }) => {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  // Function to render selected chart component
  const renderChart = () => {
    if (selectedChart === "pie") return <PieChartTest />;
    if (selectedChart === "bar") return <BarChartTest />;
    if (selectedChart === "line") return <LineChartTest />;
    return (
      <h1 className="text-[#BDBBCB] text-[20px]">
        No Chart selected for Visualize
      </h1>
    );
  };

  return (
    <div className="flex flex-col w-[400px] h-[1000px] px-6 py-4 shadow-2xl">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-[16px] font-bold">Recommend Chart</h1>
        <Button
          onClick={onClose} // Call onClose to hide RightSide
          children={<BsX className="w-9 h-9" />}
          color="none"
          className="!bg-transparent !hover:bg-gray-500"
          radius="full"
        />
      </div>
      <div className="flex justify-around">
        <button
          onClick={() => setSelectedChart("pie")}
          className="flex flex-col px-4 py-2 justify-center items-center hover:scale-105 duration-150 hover:bg-gray-200 rounded-md hover:ring-1 hover:ring-blue-500"
        >
          <h1 className="text-sm font-bold text-gray-700">Pie Chart</h1>
          <img src={PieChartIcon} alt="Pie Chart" className="w-12 h-12" />
        </button>
        <button
          onClick={() => setSelectedChart("bar")}
          className="flex flex-col px-4 py-2 justify-center items-center hover:scale-105 duration-150 hover:bg-gray-200 rounded-md hover:ring-1 hover:ring-blue-500"
        >
          <h1 className="text-sm font-bold text-gray-700">Bar Chart</h1>
          <img src={BarChartIcon} alt="Bar Chart" className="w-12 h-12" />
        </button>
        <button
          onClick={() => setSelectedChart("line")}
          className="flex flex-col px-4 py-2 justify-center items-center hover:scale-105 duration-150 hover:bg-gray-200 rounded-md hover:ring-1 hover:ring-blue-500"
        >
          <h1 className="text-sm font-bold text-gray-700">Line Chart</h1>
          <img src={LineChartIcon} alt="Line Chart" className="w-12 h-12" />
        </button>
      </div>
      <div className="border-b-2 py-2 border-[#BDBBCB]" />
      <div className="pt-2">
        <h1 className="text-[16px] font-bold">Visualize Overview</h1>
      </div>
      <div className="flex h-full w-full justify-center items-center bg-slate-300">
        {renderChart()}
      </div>
    </div>
  );
};

export default RightSide;
