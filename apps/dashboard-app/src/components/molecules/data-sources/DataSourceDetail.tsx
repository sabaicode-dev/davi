import React, { useEffect, useState } from "react";
import Button from "../../atoms/Button";
import { DeleteIcon, EditIcon } from "../../atoms/icons/Icon";
import formatDate from "@/src/utils/formatDate";
import formatFileSize from "@/src/utils/formatSizeFile";
import ImageProject from "@/public/images/saveImage.png";
import request from "@/src/utils/helper";
import { useParams } from "react-router-dom";
import Spinner from "../../loading/Spinner";

interface ProjectFile {
  _id: string;
  filename: string;
  size: number;
  type: string;
  created_at: string;
  uuid: string;
  is_original: boolean;
  is_deleted: boolean;
  is_sample: boolean;
}

const DataSourceDetail: React.FC = () => {
  const { projectId } = useParams();
console.log('projectId:', projectId);
  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectFiles = async () => {
      if (!projectId) return;

      try {
        const response = await request({
          url: `http://127.0.0.1:8000/api/v1/projects/${projectId}/files/`,
          method: "GET",
        });

        // Detailed logging
        console.log("Full response:", response);
        console.log("Response success:", response.success);
        console.log("Response data:", response.data);
        console.log("Response data.data:", response.data?.data);

        if (response.success && response.data?.data) {
          console.log("Setting project files:", response.data.data);
          setProjectFiles(response.data.data);
        } else {
          console.log("Throwing error due to unsuccessful response");
          throw new Error(response.message || "Failed to fetch files");
        }
      } catch (err: any) {
        console.error("Full error object:", err);
        const errorMessage =
          err.message || "An error occurred while fetching data.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectFiles();
  }, []);
  // useEffect(() => {
  //   setCurrentProjectId(projectId || null);
  //   const fetchProjectFiles = async () => {
  //     if (!currentProjectId) return;

  //     try {
  //       const response = await request({
  //         url: `http://127.0.0.1:8000/api/v1/projects/${currentProjectId}/files/`,
  //         method: "GET",
  //       });

  //       if (response.success && response.data?.data) {
  //         setProjectFiles(response.data.data);
  //       } else {
  //         throw new Error(response.message || "Failed to fetch files");
  //       }
  //     } catch (err: any) {
  //       setError(err.message || "An error occurred while fetching data.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // Use the projectId from the URL parameters
  //   setCurrentProjectId(projectId || null);
  //   fetchProjectFiles();
  // }, [currentProjectId, location.pathname]);

  const handleDeleteFile = async (fileId: string) => {
    try {
      const response = await request({
        url: `http://127.0.0.1:8000/api/v1/projects/${projectId}/files/${fileId}`,
        method: "DELETE",
      });

      if (response.success) {
        setProjectFiles((prevFiles) =>
          prevFiles.filter((file) => file._id !== fileId)
        );
      } else {
        throw new Error(response.message || "Failed to delete file");
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete file");
    }
  };

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-6">
        {projectFiles.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded-xl">
            No files found
          </div>
        ) : (
          projectFiles.map((file, index) => (
            <div
              key={file._id}
              className="flex justify-between items-center p-5 xl:p-2 2xl:p-3 bg-[#f2f5fd] shadow-lg rounded-xl cursor-pointer ring-1 hover:ring-blue-500 transition-all"
            >
              <div className="flex flex-row space-x-16 xl:space-x-6 2xl:space-x-12">
                <div className="flex flex-row justify-center items-center space-x-16 pl-10 xl:space-x-6 2xl:space-x-12">
                  <p className="text-xl xl:text-sm 2xl:text-base">
                    #{index + 1}
                  </p>
                  <div className="border-l-2 border-gray-500 h-12" />
                </div>
                <div className="flex flex-row space-x-4">
                  <img
                    src={ImageProject}
                    alt="File icon"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{file.filename}</h1>
                    <p className="text-gray-600 text-sm">
                      Size: {formatFileSize(file.size)}
                    </p>
                    <div className="flex gap-2">
                      <p className="text-[10px] text-gray-500 bg-blue-200 rounded-md p-1 px-2">
                        {formatDate(file.created_at)}
                      </p>
                      {file.is_original && (
                        <span className="text-[10px] text-green-700 bg-green-200 rounded-md p-1 px-2">
                          Original
                        </span>
                      )}
                      {file.is_sample && (
                        <span className="text-[10px] text-purple-700 bg-purple-200 rounded-md p-1 px-2">
                          Sample
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <Button
                  className="flex !mr-0 !pr-0 !px-0 !pl-2 !py-1 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
                  // onClick={() => handleEditClick(project._id)}
                  onClick={() => alert("Edit")}
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
                <Button
                  className="!ml-0 !pl-0 !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
                  startContent={
                    <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 xl:w-9 xl:h-w-9 2xl:w-10 2xl:h-10 rounded-xl" />
                  }
                  onClick={() => handleDeleteFile(file._id)}
                  // onClick={() => alert("Delete")}
                  size="small"
                  radius="2xl"
                  color="secondary"
                  isLoading={false}
                  isIconOnly={false}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataSourceDetail;
