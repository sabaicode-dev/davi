import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import { DeleteIcon, EditIcon } from "../../atoms/icons/Icon";
import formatDate from "@/src/utils/formatDate";
import ImageProject from "@/public/images/saveImage.png";
import request from "@/src/utils/helper";

interface Project {
  _id: string;
  project_name: string;
  project_description: string;
  created_at: string;
}
const DataSourceDetail: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await request({
          url: `http://127.0.0.1:8000/api/v1/projects/`,
          
          method: "GET",
        });

        if (response.data?.results) {
          setProjects(response.data.results);
        } else {
          throw new Error("Failed to fetch projects.");
        }
      } catch (err: any) {
        const errorMessage = err.message || "An error occurred while fetching projects.";
        setError(errorMessage);
      } finally {
      }
    };

    fetchProjects();
  }, []);


  return (
    <div className="flex flex-col space-y-6">
      {projects.map((project: Project) => (
        <div
          key={project._id}
          className="flex justify-between items-center p-4 shadow-lg rounded-xl cursor-pointer ring-2 hover:ring-blue-500 transition-all"
        >
            <div>
                <p>#1</p>
                <div/>
            </div>
            {/* Image - File name */}
          <div className="flex flex-row space-x-4">
            <img
              src={ImageProject}
              alt="Project icon"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-lg">"{project.project_name}"</h1>
              <p className="text-gray-600">
                {/* {project.project_description} */}
                Size file
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
                startContent={
                  <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 rounded-xl" />
                }
                children=""
                size="small"
                radius="2xl"
                color="secondary"
                isLoading={false}
                isIconOnly={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DataSourceDetail;
