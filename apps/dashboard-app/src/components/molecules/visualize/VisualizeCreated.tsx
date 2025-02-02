import React, { useState, useEffect, useRef } from "react";
import Button from "@/src/components/atoms/Button";
import Input from "@/src/components/atoms/Input";
import { FaPlus } from "react-icons/fa6";
import {
  DeleteIcon,
  FileVisualizeIcon,
  SortIcon,
} from "@/src/components/atoms/icons/Icon";
import { IoIosSearch, IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { format, isToday, isThisWeek } from "date-fns";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

const VisualizeCreated: React.FC = () => {
  const [visualizations, setVisualizations] = useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"Recent" | "Alphabetical">(
    "Recent"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchVisualizations = async () => {
      try {
        setIsLoading(true); // Show skeleton while loading
        const response = await axios.get(
          `${API_ENDPOINTS.API_URL}/visualizations/`
        );
        if (response.status === 200) {
          setVisualizations(response.data);
        }
      } catch (error) {
        console.error("Error fetching visualizations:", error);
      } finally {
        setIsLoading(false); // Hide skeleton after loading
      }
    };

    fetchVisualizations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINTS.API_URL}/visualizations/${id}/`
      );

      if (response.status === 200) {
        setVisualizations((prev) => prev.filter((viz) => viz.id !== id));
        console.log("Visualization deleted successfully.");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "An error occurred while deleting.";
      alert(errorMessage);
      console.error("Error deleting visualization:", error);
    }
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (isToday(parsedDate)) {
      return format(parsedDate, "'Today at' p"); // e.g., "Today at 2:30 PM"
    }

    if (isThisWeek(parsedDate, { weekStartsOn: 1 })) {
      return format(parsedDate, "'Last' EEEE 'at' p"); // e.g., "Last Tuesday at 2:30 PM"
    }

    return format(parsedDate, "PPP 'at' p"); // e.g., "Jan 7, 2025 at 2:30 PM"
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToCreateProject = () => {
    navigate("/new-project");
  };

  const handleSort = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const applySort = (option: "Recent" | "Alphabetical") => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const getFilteredVisualizations = () => {
    let filtered = [...visualizations];
    if (searchQuery.trim()) {
      filtered = filtered.filter((viz) =>
        viz.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (sortOption === "Alphabetical") {
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  };

  const filteredVisualizations = getFilteredVisualizations();

  return (
    <div className="flex flex-col relative w-full">
      <h1 className="font-bold text-[20px] mt-4">Visualize</h1>

      {/* Search and Create Section */}
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row space-x-4">
          <button
            onClick={handleSort}
            children={<SortIcon />}
            color="none"
            className="!bg-transparent !hover:bg-gray-500"
          />
          <div className="relative w-[500px]">
            <IoIosSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            <Input
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              size="lg"
              color="secondary"
              variant="bordered"
              isIconLeft={true}
              radius="2xl"
              className="pl-2 max-w-input min-w-[400px] w-full"
            />
          </div>
        </div>
        <div>
          <Button
            className="ml-auto py-3 !px-4 flex flex-row"
            onClick={goToCreateProject}
            startContent={<FaPlus />}
            children="Start New Project"
            size="small"
            radius="2xl"
            color="secondary"
          />
        </div>
      </div>

      {/* Sort Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-4 mt-24 w-64 bg-white shadow-lg rounded-md z-10 p-4"
        >
          <div className="flex flex-col gap-y-2">
            <button
              className={`flex items-center justify-between p-2 text-sm ${sortOption === "Recent" ? "font-bold text-blue-600" : ""
                }`}
              onClick={() => applySort("Recent")}
            >
              Sort by Recent
              {sortOption === "Recent" && (
                <IoMdCheckmark className="text-blue-600 font-bold ml-2" />
              )}
            </button>
            <button
              className={`flex items-center justify-between p-2 text-sm ${sortOption === "Alphabetical" ? "font-bold text-blue-600" : ""
                }`}
              onClick={() => applySort("Alphabetical")}
            >
              Sort by Alphabetical
              {sortOption === "Alphabetical" && (
                <IoMdCheckmark className="text-blue-600 ml-2" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Visualizations Section */}

      {/* Skeleton Loader */}
      {isLoading ? (
        <div className="flex flex-col mt-8 gap-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-full p-5 flex space-x-6 border-2 border-gray-200 rounded-lg"
            >
              <div className="space-x-4 flex items-center text-center">
                <Skeleton width={50} height={50} circle />
              </div>
              <div className="flex-1">
                <Skeleton width="60%" height={20} />
                <Skeleton width="40%" height={15} className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredVisualizations.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500 text-center mt-24">
            {visualizations.length > 0
              ? `No visualizations found matching "${searchQuery}".`
              : "No visualizations available. Start by creating one!"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-items-center mt-8 gap-y-4 w-full">
          {filteredVisualizations.map((viz, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/visualize/${viz.id}/detail`, { state: { viz } })
              }
              className="w-full p-5 flex space-x-6 border-2 border-blue-200 hover:border-blue-500 duration-300 rounded-lg"
            >
              <div className="space-x-4 flex justify-center items-center text-center text-[18px]">
                <span className="text-lg">#{index + 1}</span>
                <span className="text-lg">|</span>
                <span className="bg-[#F4EBFF] rounded-full w-10 h-10 flex justify-center items-center">
                  <FileVisualizeIcon />
                </span>
              </div>
              <div className="flex justify-between w-full">
                <div className="font-medium text-[14px] cursor-pointer w-[95%]">
                  <h1 className="font-bold">{viz.name}</h1>
                  <p className="text-sm text-gray-500">
                    {formatDate(viz.created_at)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(viz.id);
                  }}
                  className="text-red-500 !bg-transparent text-2xl"
                >
                  <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 rounded-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VisualizeCreated;
