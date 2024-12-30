import React, { useEffect, useState } from "react";
import ImageProject from "@/public/images/saveImage.png";
import formatDate from "@/src/utils/formatDate";
import { useNavigate } from "react-router-dom";
import { DeleteIcon } from "@/src/components/atoms/icons/Icon";
import SkeletonLoader from "@/src/components/molecules/loading/SelectProjectSkeleton";
import EditProject from "@/src/components/molecules/modals/EditProjectModal";
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

const ShowProject: React.FC<SelectProjectProps> = ({
  selectedSort = "recent",
  children,
  onDataFetch,
  onError,
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
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      if (!isMounted) return;

      setIsLoading(true);
      try {
        const response = await request({
          url: `http://3.24.110.41:8000/api/v1/projects/`,
          method: "GET",
        });

        if (isMounted && response.data?.results) {
          console.log("API Response:", response.data.results); 
          const filteredProjects = response.data.results.filter(
            (project: any) =>
              project.project_name === "Dataset" ||
              project.project_name === "Sample_Data" ||
              project.project_name === "Data_Sample"
          );
          console.log("Filtered Projects:", filteredProjects); 
          setProjects(filteredProjects);
          onDataFetch?.(filteredProjects);
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

  // const handleDeleteProject = (projectId: string) => {
  //   // Temporarily remove the project from the UI
  //   setProjects((prevProjects) =>
  //     prevProjects.filter((project) => project._id !== projectId)
  //   );
  // };

  if (children) {
    return <>{children}</>;
  }

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

  const handleProjectSelect = (project: Project) => {
    navigate(`/project/${project._id}`, {
      state: {
        projectName: project.project_name,
        projectDescription: project.project_description,
      },
    });
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

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="space-y-5 overflow-auto mt-20 px-40 w-full pb-12">
      <h1 className="font-bold"> Datasets</h1>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-40" />
      )}
      <div className="flex flex-col justify-items-center mt-8 gap-y-4 w-full">
        {filteredProjects.map((project: Project, index) => (
          <div
            key={project._id}
            onClick={() => handleProjectSelect(project)}
            className="w-full  p-5 flex space-x-10 rounded-lg ring-2"
          >
            {/* Left Section */}
            <div className="space-x-5 pl-5 flex justify-center items-center text-center text-[18px] ">
              <span>#{index + 1}</span>
              <span>|</span>
              <img
                src={ImageProject}
                alt="Project icon"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>

            {/* Middle Section */}
            <div className="flex justify-between w-full">
              <div className="font-medium text-[14px] cursor-pointer w-[95%]">
                <p className="font-bold text-lg">{project.project_name}</p>
                <p className="text-gray-600">
                  {formatDate(project.created_at)}
                </p>
              </div>
              {/* <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProject(project._id);
                }}
                className="text-red-500 !bg-transparent text-2xl pr-7 "
              >
                <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 rounded-xl" />
              </button> */}
            </div>
          </div>
        ))}
      </div>
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