import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import { DeleteIcon, EditIcon } from "../../atoms/icons/Icon";
import formatDate from "@/src/utils/formatDate";
import ImageProject from "@/public/images/saveImage.png";
import request from "@/src/utils/helper";
import { useParams } from "react-router-dom";

interface Project {
  _id: string;
  project_name: string;
  project_description: string;
  created_at: string;
}

interface ProjectFile {
  _id: string;
  file_name: string;
  file_size: string;
  created_at: string;
}
const DataSourceDetail: React.FC = () => {
  const { projectId } = useParams();
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [projectDetails, setProjectDetails] = useState<Project | null>(null);
  useEffect(() => {
    const fetchProjectFiles = async () => {
      if (!projectId) return;

      try {
        const filesResponse = await request({
          url: `http://127.0.0.1:8000/api/v1/projects/${projectId}/files/`,
          method: "GET",
        });

        const projectResponse = await request({
          url: `http://127.0.0.1:8000/api/v1/projects/${projectId}/`,
          method: "GET",
        });

        if (filesResponse.data?.results) {
          setProjectFiles(filesResponse.data.results);
        }

        if (projectResponse.data) {
          setProjectDetails(projectResponse.data);
        }
      } catch (err: any) {
        const errorMessage =
          err.message || "An error occurred while fetching data.";
        setError(errorMessage);
      }
    };

    fetchProjectFiles();
  }, [projectId]);
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!projectDetails) {
    return <div>Loading...</div>;
  }
  //   return (
  //     <div className="flex flex-col space-y-6">
  //       {projects.map((project: Project) => (
  //         <div
  //           key={project._id}
  //           className="flex justify-between items-center  p-4 xl:p-2 2xl:p-2 bg-[#f2f5fd] shadow-lg rounded-xl cursor-pointer ring-1 hover:ring-blue-500 transition-all"
  //         >
  //           <div className="flex flex-row space-x-16 xl:space-x-6 2xl:space-x-12">
  //             <div className="flex flex-row justify-center items-center space-x-16 pl-10 xl:space-x-6 2xl:space-x-12">
  //               <p className="text-xl xl:text-sm 2xl:text-base">#1</p>
  //               <div className="border-l-2 border-gray-500 h-16" />
  //             </div>
  //             <div className="flex flex-row space-x-4">
  //               <img
  //                 src={ImageProject}
  //                 alt="Project icon"
  //                 className="w-12 h-12 object-cover rounded-lg"
  //               />
  //               <div className="flex flex-col">
  //                 <h1 className="font-bold text-lg">"{project.project_name}"</h1>
  //                 <p className="text-gray-600 text-sm">
  //                   {/* {project.project_description} */}
  //                   Size file
  //                 </p>
  //                 <p className="text-[10px] text-gray-500 bg-blue-200 rounded-md p-1 px-2">
  //                   {formatDate(project.created_at)}
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="flex flex-row justify-between items-center">
  //             <div
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //               }}
  //             >
  //               <Button
  //                 className="!ml-0 !pl-0  !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
  //                 startContent={
  //                   <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 xl:w-9 xl:h-w-9 2xl:w-10 2xl:h-10 rounded-xl" />
  //                 }
  //                 onClick={() => alert("Deleted")}
  //                 children=""
  //                 size="small"
  //                 radius="2xl"
  //                 color="secondary"
  //                 isLoading={false}
  //                 isIconOnly={false}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  return (
    <div className="flex flex-col space-y-6">
      {projectFiles.map((file, index) => (
        <div
          key={file._id}
          className="flex justify-between items-center p-4 xl:p-2 2xl:p-2 bg-[#f2f5fd] shadow-lg rounded-xl cursor-pointer ring-1 hover:ring-blue-500 transition-all"
        >
          <div className="flex flex-row space-x-16 xl:space-x-6 2xl:space-x-12">
            <div className="flex flex-row justify-center items-center space-x-16 pl-10 xl:space-x-6 2xl:space-x-12">
              <p className="text-xl xl:text-sm 2xl:text-base">#{index + 1}</p>
              <div className="border-l-2 border-gray-500 h-16" />
            </div>
            <div className="flex flex-row space-x-4">
              <img
                src={ImageProject}
                alt="File icon"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h1 className="font-bold text-lg">"{file.file_name}"</h1>
                <p className="text-gray-600 text-sm">Size: {file.file_size}</p>
                <p className="text-[10px] text-gray-500 bg-blue-200 rounded-md p-1 px-2">
                  {formatDate(file.created_at)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Button
                className="!ml-0 !pl-0 !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
                startContent={
                  <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 xl:w-9 xl:h-w-9 2xl:w-10 2xl:h-10 rounded-xl" />
                }
                onClick={() => alert("Deleted")}
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
