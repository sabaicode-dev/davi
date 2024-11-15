import React, { useEffect, useState } from "react";
import ImageProject from "@/public/images/saveImage.png";
import request from "@/src/utils/helper";
import formatDate from "@/src/utils/formatDate";
import { HiDotsVertical } from "react-icons/hi";

interface IProject {
  _id?: string;
  project_name?: string;
  project_description?: string;
  created_at?: string;
}

interface SelectProjectProps {
  onSelectProject?: (projectId: string) => void;
  onBack?: () => void;
}

interface SelectProjectProps {
  onSelectProject?: (projectId: string) => void;
  onBack?: () => void;
  selectedSort?: "recent" | "alphabetical" | null;
}

const SelectProject: React.FC<SelectProjectProps> = ({
  onSelectProject,
  onBack,
  selectedSort,
}) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        // Determine sort_by value based on selectedSort
        let sortBy = "";
        if (selectedSort === "recent") {
          sortBy = "-created_at"; // Sort by creation date descending
        } else if (selectedSort === "alphabetical") {
          sortBy = "project_name"; // Sort by project name ascending
        }

        // Fetch projects with sort_by parameter
        const response = await request({
          url: `http://127.0.0.1:8000/api/v1/projects/?sort_by=${sortBy}`,
          method: "GET",
        });

        if (response.success && response.data && response.data.results) {
          setProjects(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    getProject();
  }, [selectedSort]); // Refetch projects when selectedSort changes

  return (
    <div className="space-y-4 overflow-auto mt-4 p-2">
      {projects.map((project) => (
        <div
          key={project._id}
          onClick={() => onSelectProject?.(project._id!)}
          className="flex justify-between rounded-xl shadow-lg p-4 cursor-pointer active:ring-2 active:blue-600 hover:ring-2 hover:blue-600 h-[120px]"
        >
          <div className="flex flex-row space-x-4">
            <img
              src={ImageProject}
              alt="Save Image for project"
              className="w-12 h-12"
            />
            <div className="space-y-1">
              <h1 className="font-bold text-lg w-auto">{project.project_name}</h1>
              <p className="text-sm opacity-60 w-auto">
                {!project.project_description
                  ? "Empty description!!!"
                  : project.project_description}
              </p>
              <p className="flex justify-center items-center text-[12px] rounded-full bg-red-100 p-1 px-2 w-fit">
                {formatDate(project.created_at ?? "No date available")}
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 w-9 h-9">
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert("click");
              }}
            >
              <HiDotsVertical />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end items-end w-full">
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 text-black bg-transparent border-[1.5px] border-[#E6EDFF] rounded-md font-semibold hover:bg-gray-300"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectProject