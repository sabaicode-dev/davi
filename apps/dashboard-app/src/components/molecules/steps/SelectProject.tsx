import React, { useEffect } from "react";
import { useAPI } from "@/src/context/APIContext";
import ImageProject from "@/public/images/saveImage.png";
import formatDate from "@/src/utils/formatDate";

interface SelectProjectProps {
  selectedSort?: "recent" | "alphabetical" | null;
}

const SelectProject: React.FC<SelectProjectProps> = ({ selectedSort }) => {
  const { projects, fetchProjects, getFilteredProjects, isLoading, error } =
    useAPI();

  useEffect(() => {
    if (projects.length === 0) fetchProjects();
  }, [fetchProjects, projects]);

  const filteredProjects = getFilteredProjects(selectedSort);

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4 overflow-auto mt-4 p-2">
      {filteredProjects.map((project) => (
        <div
          key={project._id}
          className="flex justify-between p-4 shadow-lg rounded-xl"
        >
          <div className="flex flex-row space-x-4">
            <img src={ImageProject} alt="Project" className="w-12 h-12" />
            <div>
              <h1 className="font-bold">{project.project_name}</h1>
              <p>{project.project_description || "No description"}</p>
              <p className="text-xs">{formatDate(project.created_at)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectProject;
