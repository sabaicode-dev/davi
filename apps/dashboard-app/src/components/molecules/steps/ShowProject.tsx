import React, { useEffect, useRef, useState } from "react";
import ImageProject from "@/public/images/saveImage.png";
import formatDate from "@/src/utils/formatDate";
import { useNavigate } from "react-router-dom";
import Button from "@/src/components/atoms/Button";
import { FaPlus } from "react-icons/fa6";
import {
  DeleteIcon,
  EditIcon,
  SortIcon,
} from "@/src/components/atoms/icons/Icon";
import SkeletonLoader from "@/src/components/molecules/loading/SelectProjectSkeleton";
import EditProject from "@/src/components/molecules/modals/EditProjectModal";
import request from "@/src/utils/helper";
import { IoIosSearch, IoMdCheckmark } from "react-icons/io";
import Input from "../../atoms/Input";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

interface Project {
  _id: string;
  project_name: string;
  project_description: string;
  created_at: string;
}

interface SelectProjectProps {
  selectedSort?: "recent" | "alphabetical" | null;
  onBack?: () => void;
  children?: React.ReactNode;
  onDataFetch?: (data: any[]) => void;
  onError?: (error: string) => void;
}

const ShowProject: React.FC<SelectProjectProps> = ({
  selectedSort = "recent",
  children,
  onDataFetch,
  onError,
}) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"Recent" | "Alphabetical">(
    "Recent"
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      if (!isMounted) return;

      setIsLoading(true);
      try {
        const response = await request({
          url: `${API_ENDPOINTS.API_URL}/project/`,
          method: "GET",
        });

        if (isMounted && response.data?.results) {
          setProjects(response.data.results);
          onDataFetch?.(response.data.results);
        } else if (isMounted) {
          throw new Error("Failed to fetch projects.");
        }
      } catch (err: any) {
        if (isMounted) {
          const errorMessage =
            err.message || "An error occurred while fetching projects.";
          setError(errorMessage);
          onError?.(errorMessage);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeleteProject = async (projectId: string) => {
    setIsDeleting(projectId);

    try {
      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/project/${projectId}/delete/`,
        method: "DELETE",
        withCredentials: false,
      });

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.data?.success
      ) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
        console.log("Project deleted successfully");
      } else {
        alert("Failed to delete project. Please try again.");
      }
    } catch (error: any) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  if (children) {
    return <>{children}</>;
  }

  const handleProjectSelect = (project: Project) => {
    navigate(`/project/${project._id}`, {
      state: {
        projectName: project.project_name,
        projectDescription: project.project_description,
      },
    });
  };

  const handleEditClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setIsModalOpen(true);
  };

  const updateProject = (
    projectId: string,
    newName: string,
    newDescription: string
  ) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              project_name: newName,
              project_description: newDescription,
            }
          : project
      )
    );
  };

  const newProject = () => {
    navigate("/project/create", {
      state: { from: "showProject" },
    });
  };

  const handleSort = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const applySort = (option: "Recent" | "Alphabetical") => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const getFilteredProjects = () => {
    const filteredProjects = [...projects].filter((project) =>
      project.project_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === "Alphabetical") {
      return filteredProjects.sort((a, b) =>
        a.project_name.localeCompare(b.project_name)
      );
    }
    return filteredProjects.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  const filteredProjects = getFilteredProjects();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-5 overflow-auto mt-4 px-40 w-full pb-12">
      {/* Add backdrop blur overlay when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-40" />
      )}

      <div className="flex flex-col relative w-full">
        <h1 className="font-bold text-[20px] mt-4">Project</h1>

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
              onClick={newProject}
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
                className={`flex items-center justify-between p-2 text-sm ${
                  sortOption === "Recent" ? "font-bold text-blue-600" : ""
                }`}
                onClick={() => applySort("Recent")}
              >
                Sort by Recent
                {sortOption === "Recent" && (
                  <IoMdCheckmark className="text-blue-600 font-bold ml-2" />
                )}
              </button>
              <button
                className={`flex items-center justify-between p-2 text-sm ${
                  sortOption === "Alphabetical" ? "font-bold text-blue-600" : ""
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
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && searchQuery && (
        <p className="text-center text-gray-500 mt-10">
          No projects found matching "{searchQuery}".
        </p>
      )}

      {filteredProjects.map((project: Project, index) => (
        <div
          key={project._id}
          className="flex justify-between items-center px-4 py-2 shadow-lg rounded-md cursor-pointer ring-2 hover:ring-blue-500 transition-all"
          onClick={() => handleProjectSelect(project)}
        >
          <div className="flex flex-row items-center space-x-4">
            <span className="text-lg">#{index + 1}</span>
            <span className="text-lg">|</span>
            <img
              src={ImageProject}
              alt="Project icon"
              className="w-11 h-11 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <h1 className="font-bold">{project.project_name}</h1>
              <p className="text-gray-600 text-sm">
                {project.project_description || "No description"}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(project.created_at)}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className=""
            >
              <Button
                className="flex !mr-0 !pr-0 !px-0 !pl-2 !py-1 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
                onClick={() => handleEditClick(project._id)}
                startContent={
                  <EditIcon className="!text-blue-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 rounded-xl" />
                }
                children=""
                size="small"
                radius="2xl"
                color="secondary"
                isLoading={false}
                isIconOnly={false}
                isDisabled={false}
              />
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button
                className="!ml-0 !pl-0  !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
                onClick={() => handleDeleteProject(project._id)}
                startContent={
                  <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 rounded-xl" />
                }
                children=""
                size="small"
                radius="2xl"
                color="secondary"
                isLoading={false}
                isIconOnly={false}
                isDisabled={isDeleting === project._id}
              />
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && selectedProjectId && (
        <EditProject
          projectId={selectedProjectId}
          initialProjectName={
            filteredProjects.find((p) => p._id === selectedProjectId)
              ?.project_name || ""
          }
          initialDescription={
            filteredProjects.find((p) => p._id === selectedProjectId)
              ?.project_description || ""
          }
          onUpdateProject={updateProject}
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ShowProject;
