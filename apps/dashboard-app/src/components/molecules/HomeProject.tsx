import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa6";
import Button from "../atoms/Button";
import SelectProject from "@/src/components/molecules/steps/SelectProject";
import { useNavigate } from "react-router-dom";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

const HomeProject: React.FC = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<
    "recent" | "alphabetical" | null
  >(null);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const handleSortByRecent = () => {
    setSelectedSort("recent");
    closeDropdown();
  };

  const handleSortByAlphabetical = () => {
    setSelectedSort("alphabetical");
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-full xl:mx-4 2xl:mx-10">
      <div className="mt-4">
        <h1 className="text-lg font-bold mb-4">Project</h1>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-center items-center space-x-4 lg:w-[500px] xl:w-[600px] 2xl:w-[900px]">
            <div>
              <Button
                className="bg-transparent hover:bg-transparent"
                size="medium"
                radius="none"
                children={<IoFilter className="w-5 h-5 text-gray-950" />}
                onClick={toggleProfileDropdown}
              />
              {isProfileDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute left-44 mt-[10px] w-80 bg-white shadow-lg rounded-sm z-10 p-4 "
                >
                  <div className="flex justify-between items-center pb-2 border-b">
                    <h1>Filter</h1>
                    <button onClick={closeDropdown} className="text-gray-500">
                      &#x2715;
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleSortByRecent}
                      className="w-full flex justify-between items-center p-3 hover:bg-gray-100 rounded-sm space-x-3"
                    >
                      <div className="flex flex-row space-x-2 justify-center items-center">
                        <FaSortAlphaDown />
                        <span>Sort by Recent</span>
                      </div>
                      {selectedSort === "recent" && (
                        <FaCheck className="ml-auto" />
                      )}
                    </button>
                    <button
                      onClick={handleSortByAlphabetical}
                      className="w-full flex justify-between items-center p-3 hover:bg-gray-100 rounded-sm mt-2 space-x-3"
                    >
                      <div className="flex flex-row space-x-2 justify-center items-center">
                        <FaSortAlphaUp />
                        <span>Sort by Alphabetical</span>
                      </div>
                      {selectedSort === "alphabetical" && (
                        <FaCheck className="ml-auto" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row justify-center items-center px-2 p-1 rounded-xl border-[1px] space-x-2 border-gray-800 focus:border-[1px] focus:border-blue-600 w-full lg:w-[500px] xl:w-[600px] 2xl:w-[900px]">
              <IoIosSearch className="w-5 h-5" />
              <input
                type="text"
                className="flex outline-none p-[6px] !ml-0 w-full"
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
              onClick={() => navigate("/accountsetting")}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <SelectProject selectedSort={selectedSort} />
      </div>
    </div>
  );
};

export default HomeProject