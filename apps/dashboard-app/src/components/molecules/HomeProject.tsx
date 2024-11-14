import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Button from "../atoms/Button";

const HomeProject: React.FC = () => {
  return (
    <div className="w-full h-full mx-32 mt-4">
      <h1 className="text-lg font-bold mb-4">Project</h1>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center space-x-4">
          {/* Filter */}
          <div>
            <Button
              className="bg-transparent hover:bg-transparent"
              size="medium"
              radius="none"
              children={<IoFilter className="w-5 h-5 text-gray-950" />}
              onClick={() => alert("Click o hx")}
            />
          </div>
          {/* Input Search */}
          <div className="flex flex-row justify-center items-center px-2 p-1 rounded-xl border-[1px] space-x-2 border-gray-800 focus:border-[1px] focus:border-blue-600">
            <IoIosSearch className="w-5 h-5" />
            <input
              type="text"
              className="outline-none p-[6px] !ml-0"
              placeholder="Search"
            />
          </div>
        </div>
        <div>
          <Button
            className="!py-[9px]"
            size="medium"
            radius="2xl"
            children="Start New Project"
            color="secondary"
            startContent={<FaPlus />}
            onClick={() => alert("Click o hx")}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeProject;
