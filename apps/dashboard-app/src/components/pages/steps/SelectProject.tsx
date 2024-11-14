import React, { useEffect, useState } from "react";
import ImageProject from "@/public/images/saveImage.png";
import request from "@/src/utils/helper";
import formatDate from "@/src/utils/formatDate";

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

const SelectProject: React.FC<SelectProjectProps> = ({ onSelectProject, onBack }) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  // Fetch the project when component mounts
  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await request({
          url: "http://127.0.0.1:8000/api/v1/projects/",
          method: "GET",
          data: {},
        });
        console.log("Response from API:", response);
        if (response.success && response.data && response.data.results) {
          console.log("Projects:", response.data.results);
          setProjects(response.data.results);
        }
      } catch (error) {
        console.error(`Error fetching projects`, error);
      }
    };
    getProject();
  }, []);

  return (
    <div>
      {/* Only render the back button if onBack is defined */}
      {onBack && <button onClick={onBack}>Back</button>} 
      
      {projects.length > 0 ? (
        projects.map((project) => (
          <div
            key={project._id}
            onClick={() => {
              // Ensure project._id is a string before calling onSelectProject
              if (project._id && onSelectProject) {
                onSelectProject(project._id); // Trigger the onSelectProject callback
              }
            }}
            className="flex flex-row space-x-3 bg-gray-100 rounded-lg p-4 shadow-lg mx-24 cursor-pointer"
          >
            <img
              src={ImageProject}
              alt="Save Image for project"
              className="w-12 h-12"
            />
            <div className="space-y-1">
              <h1 className="font-bold text-lg">{project.project_name}</h1>
              <p className="text-sm opacity-60">
                {project.project_description}
              </p>
              <p className="flex justify-center items-center text-[12px] rounded-full bg-red-200 w-auto p-1 px-2">
                {formatDate(project.created_at ?? "No date available")}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div>No projects found.</div>
      )}
    </div>
  );
};

export default SelectProject;
