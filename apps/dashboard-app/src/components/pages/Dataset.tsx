
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DeleteIcon } from "../atoms/icons/Icon";
import ImageProject from "@/public/images/saveImage.png";

interface Dataset {
  _id: string;
  project_id: string;
  filename: string;
  file: string;
  size: number;
  type: string;
  created_at: string;
  uuid: string;
  is_original: boolean;
  is_deleted: boolean;
  is_sample: boolean;
  original_file: string | null;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Dataset[];
}

const Dataset = () => {
  const { projectId } = useParams<{ projectId: string }>(); // Get projectId from the URL
  const navigate = useNavigate();
  const [files, setFiles] = useState<Dataset[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
const idProject="676789221bcae8b9eded075c";
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `http://127.0.0.1:8000/api/v1/projects/${idProject}/files/`
        );

        if (response.data.success && response.data.data) {
          const filteredFiles = response.data.data.filter(
            (file) => file.is_sample
          );
          console.log("Filtered files (is_sample):", filteredFiles);
          setFiles(filteredFiles);
        } else {
          throw new Error(response.data.message || "Failed to fetch files");
        }
      } catch (err) {
        console.error("Error fetching files:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [projectId]);

  const handleTemporaryDelete = (fileId: string) => {
    // Temporarily remove the card from the state
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
  };
  // const handleNext = (fileId: string) => {
  //   if (projectId && fileId) {
  //     console.log(`Navigating to: /project/${projectId}/file/${fileId}/cleaning`);
  //     window.location.href = `/project/${projectId}/file/${fileId}/cleaning`;
  //   } else {
  //     console.error("Missing projectId or fileId", { projectId, fileId });
  //   }
  // };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-72">
      <div className="flex flex-col space-y-6">
        <div className="font-bold">Datasets</div>
        <div className="flex flex-col space-y-6">
          {files.map((file, index) => (
            <div
              key={file._id}
              className="flex justify-between items-center p-2 bg-[#f2f5fd] shadow-lg rounded-md cursor-pointer ring-1 hover:ring-blue-500 transition-all"
              // onClick={() => handleNext(file._id)} // Trigger `handleNext` when clicking the card
            >
              <div className="flex flex-row space-x-16 xl:space-x-6 2xl:space-x-12">
                <div className="flex flex-row justify-center items-center space-x-16 pl-10 xl:space-x-6 2xl:space-x-12">
                  <p className="text-xl xl:text-sm 2xl:text-base">
                    #{index + 1}
                  </p>
                  <div className="border-l-2 border-gray-500 h-12" />
                </div>
                <div className="flex flex-row items-center space-x-4">
                  <img
                    src={ImageProject}
                    alt="File icon"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{file.filename}</h1>
                    <p className="text-gray-600 text-sm">
                      Size: {file.size} bytes
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <button
                  className="!ml-0 !pl-0 !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
                  onClick={() => handleTemporaryDelete(file._id)} // Handle temporary delete
                >
                  <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 xl:w-9 xl:h-w-9 2xl:w-10 2xl:h-10 rounded-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dataset;
// import React, { useEffect, useState } from "react";
// import Button from "../atoms/Button";
// import { DeleteIcon,EditIcon } from "../atoms/icons/Icon";
// import formatDate from "@/src/utils/formatDate";
// import formatFileSize from "@/src/utils/formatSizeFile";
// import ImageProject from "@/public/images/saveImage.png";
// import request from "@/src/utils/helper";
// import { useNavigate, useParams } from "react-router-dom";
// import Spinner from "../molecules/loading/Spinner";
// import DeleteProjectModal from "../molecules/modals/DeleteProjectModal";
// interface ProjectFile {
//   _id: string;
//   filename: string;
//   size: number;
//   type: string;
//   created_at: string;
//   uuid: string;
//   is_original: boolean;
//   is_deleted: boolean;
//   is_sample: boolean;
// }

// const Dataset: React.FC = () => {
//   const { projectId } = useParams();
//   const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();
//   const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
//     useState(false);
//   const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);

//   const handleDeleteFile = async (fileId: string) => {
//     try {
//       await request({
//         url: `http://3.24.110.41:8000/api/v1/project/${projectId}/file/${fileId}/delete/`,
//         method: "DELETE",
//       });
//       console.log("File deleted successfully");
//       // Immediately remove the deleted file from the UI
//       setProjectFiles((prevFiles) =>
//         prevFiles.filter((file) => file._id !== fileId)
//       );
//     } catch (error) {
//       setError(error instanceof Error ? error.message : "An error occurred");
//       console.error("Error Delete file:", error);
//     }
//   };
//   const handleDeleteButtonClick = (fileId: string) => {
//     setFileIdToDelete(fileId); // Store the file ID to delete
//     setIsDeleteConfirmationOpen(true);
//   };

//   // Handle Confirm Delete
//   // const handleConfirmDelete = () => {
//   //   handleDeleteFile();
//   //   setIsDeleteConfirmationOpen(false);
//   // };

//   // Handle Close Delete Confirmation
//   const handleCloseDeleteConfirmation = () => {
//     setIsDeleteConfirmationOpen(false);
//   };

//   const handleCardClick = (fileId: string) => {
//     navigate(`/project/${projectId}/file/${fileId}/cleaning`);
//   };

//   useEffect(() => {
//     const fetchProjectFiles = async () => {
//       if (!projectId) return;

//       try {
//         const response = await request({
//           url: `http://3.24.110.41:8000/api/v1/projects/${projectId}/files/`,
//           method: "GET",
//         });

//         if (response.success && response.data?.data) {
//           console.log("All file response:", response.data.data);
//           setProjectFiles(response.data.data);
//         } else {
//           console.log("Throwing error due to unsuccessful response");
//           throw new Error(response.message || "Failed to fetch files");
//         }
//       } catch (err: any) {
//         console.error("Full error object:", err);
//         const errorMessage =
//           err.message || "An error occurred while fetching data.";
//         setError(errorMessage);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProjectFiles();
//   }, [projectId]);
//   if (error) {
//     return (
//       <div className="text-red-500 p-4 bg-red-50 rounded-lg">
//         Error: {error}
//       </div>
//     );
//   }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-48">
//         <Spinner />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col space-y-6">
//       <div className="flex flex-col space-y-6">
//         {projectFiles.length === 0 ? (
//           <div className="text-center p-8 bg-gray-50 rounded-xl">
//             No files found
//           </div>
//         ) : (
//           projectFiles.map((file, index) => (
//             <div
//               key={file._id}
//               onClick={() => {
//                 handleCardClick(file._id);
//               }}
//               className="flex justify-between items-center p-2  bg-[#f2f5fd] shadow-lg rounded-md cursor-pointer ring-1 hover:ring-blue-500 transition-all"
//             >
//               <div className="flex flex-row space-x-16 xl:space-x-6 2xl:space-x-12">
//                 <div className="flex flex-row justify-center items-center space-x-16 pl-10 xl:space-x-6 2xl:space-x-12">
//                   <p className="text-xl xl:text-sm 2xl:text-base">
//                     #{index + 1}
//                   </p>
//                   <div className="border-l-2 border-gray-500 h-12" />
//                 </div>
//                 <div className="flex flex-row items-center space-x-4">
//                   <img
//                     src={ImageProject}
//                     alt="File icon"
//                     className="w-12 h-12 object-cover rounded-lg"
//                   />
//                   <div className="flex flex-col">
//                     <h1 className="font-bold text-lg">{file.filename}</h1>
//                     <p className="text-gray-600 text-sm">
//                       Size: {formatFileSize(file.size)}
//                     </p>
//                     <div className="flex gap-2">
//                       <p className="text-[10px] text-gray-500 bg-blue-200 rounded-md p-1 px-2">
//                         {formatDate(file.created_at)}
//                       </p>
//                       {file.is_original && (
//                         <span className="text-[10px] text-green-700 bg-green-200 rounded-md p-1 px-2">
//                           Original
//                         </span>
//                       )}
//                       {file.is_sample && (
//                         <span className="text-[10px] text-purple-700 bg-purple-200 rounded-md p-1 px-2">
//                           Sample
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-row justify-between items-center">
//                 <div
//                   onClick={(e) => {
//                     e.stopPropagation();
//                   }}
//                 >
//                   <Button
//                     className="flex !mr-0 !pr-0 !px-0 !pl-2 !py-1 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
//                     // onClick={() => handleEditClick(file._id)}
//                     onClick={() => alert("Edit")}
//                     startContent={
//                       <EditIcon className="!text-blue-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 rounded-xl" />
//                     }
//                     children=""
//                     size="small"
//                     radius="2xl"
//                     color="secondary"
//                     isLoading={false}
//                     isIconOnly={false}
//                     isDisabled={false}
//                   />
//                 </div>
//                 <div
//                   onClick={(e) => {
//                     e.stopPropagation();
//                   }}
//                 >
//                   <Button
//                     className="!ml-0 !pl-0 !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
//                     startContent={
//                       <DeleteIcon className="!text-red-500 bg-gray-200 hover:bg-gray-300 duration-150 p-2 w-10 h-10 xl:w-9 xl:h-w-9 2xl:w-10 2xl:h-10 rounded-xl" />
//                     }
//                     onClick={() => handleDeleteButtonClick(file._id)}
//                     size="small"
//                     radius="2xl"
//                     color="secondary"
//                     isLoading={false}
//                     isIconOnly={false}
//                   />
//                   <DeleteProjectModal
//                     isOpen={isDeleteConfirmationOpen}
//                     onClose={handleCloseDeleteConfirmation}
//                     onConfirm={() => {
//                       handleDeleteFile(file._id);
//                       setIsDeleteConfirmationOpen(false);
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dataset;
