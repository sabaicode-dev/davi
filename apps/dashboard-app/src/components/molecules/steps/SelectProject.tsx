import React, { useEffect, useState } from "react";
import ImageProject from "@/public/images/saveImage.png";
import formatDate from "@/src/utils/formatDate";
import { useNavigate } from "react-router-dom";
import Button from "@/src/components/atoms/Button";
import { FaPlus } from "react-icons/fa6";
import { DeleteIcon, EditIcon } from "@/src/components/atoms/icons/Icon";
import SkeletonLoader from "@/src/components/loading/SelectProjectSkeleton";
import CreateProjectModal from "@/src/components/molecules/modals/EditModals";
import request from "@/src/utils/helper";

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

const SelectProject: React.FC<SelectProjectProps> = ({
  selectedSort = "recent", 
  children,
  onDataFetch,
  onError
}) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await request({
  //         url: `http://127.0.0.1:8000/api/v1/projects/`,
  //         method: "GET",
  //       });

  //       if (response.data?.results) {
  //         setProjects(response.data.results);
  //       } else {
  //         throw new Error("Failed to fetch projects.");
  //       }
  //     } catch (err: any) {
  //       setError(err.message || "An error occurred while fetching projects.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProjects();
  // }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await request({
          url: `http://127.0.0.1:8000/api/v1/projects/`,
          method: "GET",
        });

        if (response.data?.results) {
          setProjects(response.data.results);
          onDataFetch?.(response.data.results);
        } else {
          throw new Error("Failed to fetch projects.");
        }
      } catch (err: any) {
        const errorMessage = err.message || "An error occurred while fetching projects.";
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [onDataFetch, onError]);



  if (children) {
    return <>{children}</>;
  }

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }
  const handleDeleteProject = async (projectId: string) => {
    setIsDeleting(projectId);

    try {
      const response = await request({
        url: `http://127.0.0.1:8000/api/v1/project/${projectId}/delete/`,
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

  const getFilteredProjects = (filter: "recent" | "alphabetical" | null) => {
    if (filter === "recent") {
      return [...projects].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    if (filter === "alphabetical") {
      return [...projects].sort((a, b) =>
        a.project_name.localeCompare(b.project_name)
      );
    }
    return projects;
  };

  const filteredProjects = getFilteredProjects(selectedSort);

  const handleProjectSelect = (projectId: string) => {
    navigate(`/pick-datasource?projectId=${projectId}`);
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
    navigate("/create-project");
  };
  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-5 overflow-auto mt-4 p-2 w-full pb-12">
      {/* Add backdrop blur overlay when modal is open */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
      )}

      <div className="flex justify-end">
        <Button
          className="ml-auto !py-2 !px-4 border-2 border-blue-500"
          onClick={newProject}
          startContent={<FaPlus />}
          children="New Project"
          size="small"
          radius="2xl"
          color="secondary"
          isLoading={false}
          isIconOnly={false}
          isDisabled={false}
        />
      </div>
      {projects.map((project: Project) => (
        <div
          key={project._id}
          className="flex justify-between items-center p-4 shadow-lg rounded-xl cursor-pointer ring-2 hover:ring-blue-500 transition-all"
          onClick={() => handleProjectSelect(project._id)}
        >
          <div className="flex flex-row space-x-4">
            <img
              src={ImageProject}
              alt="Project icon"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">{project.project_name}</h1>
              <p className="text-gray-600">
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
        <CreateProjectModal
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

export default SelectProject;
