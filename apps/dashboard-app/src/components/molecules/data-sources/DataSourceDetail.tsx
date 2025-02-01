import React, { useEffect, useState, useCallback } from "react";
import Button from "../../atoms/Button";
import { DeleteIcon, EditIcon } from "../../atoms/icons/Icon";
import formatDate from "@/src/utils/formatDate";
import formatFileSize from "@/src/utils/formatSizeFile";
import ImageProject from "@/public/images/saveImage.png";
import request from "@/src/utils/helper";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../loading/Spinner";
import DeleteProjectModal from "../modals/DeleteProjectModal";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

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
  const navigate = useNavigate();

  const [projectFiles, setProjectFiles] = useState<ProjectFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState<string | null>(null);

  // Fetch project files
  const fetchProjectFiles = useCallback(async () => {
    if (!projectId) return;

    setIsLoading(true);
    try {
      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/`,
        method: "GET",
      });

      if (response.success && response.data?.data) {
        setProjectFiles(response.data.data);
      } else {
        throw new Error(response.message || "Failed to fetch files");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjectFiles();
  }, [fetchProjectFiles]);

  const handleDeleteFile = useCallback(async () => {
    if (!fileIdToDelete) return;

    try {
      await request({
        url: `${API_ENDPOINTS.API_URL}/projects/${projectId}/files/${fileIdToDelete}/`,
        method: "DELETE",
      });

      // Optimized state update without re-fetching all files
      setProjectFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileIdToDelete));
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsDeleteConfirmationOpen(false);
      setFileIdToDelete(null);
    }
  }, [fileIdToDelete, projectId]);

  // Handle File Selection
  const handleSelectFile = useCallback(
    (fileId: string) => {
      navigate(`/projects/${projectId}/files/${fileId}/cleaning`);
    },
    [navigate, projectId]
  );

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
      {projectFiles.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-xl">No files found</div>
      ) : (
        projectFiles.map((file, index) => (
          <ProjectFileCard
            key={file._id}
            file={file}
            index={index}
            onDelete={() => {
              setFileIdToDelete(file._id);
              setIsDeleteConfirmationOpen(true);
            }}
            onSelect={handleSelectFile}
          />
        ))
      )}

      <DeleteProjectModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={handleDeleteFile}
      />
    </div>
  );
};

const ProjectFileCard: React.FC<{
  file: ProjectFile;
  index: number;
  onDelete: () => void;
  onSelect: (fileId: string) => void;
}> = ({ file, index, onDelete, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(file._id)}
      className="flex justify-between items-center p-2 bg-[#f2f5fd] shadow-lg rounded-md cursor-pointer ring-1 hover:ring-blue-500 transition-all"
    >
      <div className="flex flex-row space-x-6">
        <p className="text-xl xl:text-sm 2xl:text-base">#{index + 1}</p>
        <div className="border-l-2 border-gray-500 h-12" />
        <div className="flex flex-row items-center space-x-4">
          <img src={ImageProject} alt="File icon" className="w-12 h-12 object-cover rounded-lg" />
          <div className="flex flex-col">
            <h1 className="font-bold text-lg">{file.filename}</h1>
            <p className="text-gray-600 text-sm">Size: {formatFileSize(file.size)}</p>
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
          className="!ml-0 !pl-0 !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
          onClick={(e) => {
            e.stopPropagation();
            alert("Edit");
          }}
          startContent={<EditIcon className="!text-blue-500 p-2 w-10 h-10 rounded-xl" />}
        />
        <Button
          className="!ml-0 !pl-0 !px-0 bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          startContent={<DeleteIcon className="!text-red-500 p-2 w-10 h-10 rounded-xl" />}
        />
      </div>
    </div>
  );
};

export default DataSourceDetail;
