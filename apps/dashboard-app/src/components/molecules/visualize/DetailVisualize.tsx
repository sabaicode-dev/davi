import React from "react";
import Button from "@/src/components/atoms/Button";
import VisualizeImageIcon from "@/public/images/visualize_image_in_detail_vis.png";
import { FaEllipsis } from "react-icons/fa6";
import { LineChartTest } from "@/src/components/molecules/charts/LineChart";
import { BarChartTest } from "@/src/components/molecules/charts/BarChart";
import { PieChartTest } from "../charts/PieChart";
const DetailVisualize: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center space-x-4">
          <img
            src={VisualizeImageIcon}
            alt="VisualizeImageIcon"
            className="w-14 h-1w-14"
          />
          <div className="flex flex-col">
            {/* Title */}
            <h1 className="text-[16px] font-bold">Tech requirements</h1>
            {/* Date & Time */}
            <p className="text-[12px] text-gray-500">Tuesday at 1:29 PM</p>
          </div>
        </div>
        <div>
          <Button
            children={"Back"}
            size="medium"
            color="outline"
            radius="2xl"
            onClick={() => alert("Clicked!")}
          />
        </div>
      </div>
      <div className="border-t-2 border-[#443DFF] my-4" />
      <div className="grid grid-cols-3 w-full justify-around items-center space-x-6">
        {/* Card 1 */}
        <div className="bg-slate-100 rounded-xl border-[1px] border-gray-300 duration-150 shadow-lg hover:shadow-xl hover:scale">
          {/* Card Title */}
          <div className="flex justify-between px-4 pt-3">
            <h1 className="text-[16px] font-bold">Visualize Overview</h1>
            <Button
              children={<FaEllipsis />}
              className="!bg-transparent"
              color="none"
              onClick={() => alert("Clicked")}
            />
          </div>
          <div className="border-b-[1px] mt-1 border-gray-400" />
          {/* Card Body */}
          <div className="flex h-[330px] justify-center items-center px-4">
            <LineChartTest />
          </div>
          {/* Card Footer */}
          <div className="flex justify-start items-center w-full h-10 rounded-b-2xl border-[1px] border-t-gray-300 border-b-none px-4 py-6">
            <p className="text-[12px] text-gray-500">Tuesday at 1:29 PM</p>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-slate-100 rounded-xl border-[1px] border-gray-300 duration-150 shadow-lg hover:shadow-xl hover:scale">
          {/* Card Title */}
          <div className="flex justify-between px-4 pt-3">
            <h1 className="text-[16px] font-bold">Visualize Overview</h1>
            <Button
              children={<FaEllipsis />}
              className="!bg-transparent"
              color="none"
              onClick={() => alert("Clicked")}
            />
          </div>
          <div className="border-b-[1px] mt-1 border-gray-400" />
          {/* Card Body */}
          <div className="flex h-[330px] justify-center items-center px-4">
            <BarChartTest />
          </div>
          {/* Card Footer */}
          <div className="flex justify-start items-center w-full h-10 rounded-b-2xl border-[1px] border-t-gray-300 border-b-none px-4 py-6">
            <p className="text-[12px] text-gray-500">Tuesday at 1:29 PM</p>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-slate-100 rounded-xl border-[1px] border-gray-300 duration-150 shadow-lg hover:shadow-xl hover:scale">
          {/* Card Title */}
          <div className="flex justify-between px-4 pt-3">
            <h1 className="text-[16px] font-bold">Visualize Overview</h1>
            <Button
              children={<FaEllipsis />}
              className="!bg-transparent"
              color="none"
              onClick={() => alert("Clicked")}
            />
          </div>
          <div className="border-b-[1px] mt-1 border-gray-400" />
          {/* Card Body */}
          <div className="flex h-[330px] justify-center items-center px-4">
            <PieChartTest />
          </div>
          {/* Card Footer */}
          <div className="flex justify-start items-center w-full h-10 rounded-b-2xl border-[1px] border-t-gray-300 border-b-none px-4 py-6">
            <p className="text-[12px] text-gray-500">Tuesday at 1:29 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailVisualize;
