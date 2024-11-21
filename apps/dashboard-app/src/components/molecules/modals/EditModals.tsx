import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../../atoms/Button";
import { CloseIcon } from "../../atoms/icons/Icon";
import request from "@/src/utils/helper";

interface ICreateProjectModalProps {
  onClose?: () => void;
  projectId: string;
  initialProjectName: string;
  initialDescription: string;
  onUpdateProject?: (
    projectId: string,
    newName: string,
    newDescription: string
  ) => void;
}

const EditProject: React.FC<ICreateProjectModalProps> = ({
  onClose,
  projectId,
  initialProjectName,
  initialDescription,
  onUpdateProject,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [projectName, setProjectName] = useState<string>(initialProjectName);
  const [description, setDescription] = useState<string>(initialDescription);
  const [errorMessages, setErrorMessages] = useState<{
    projectName: string;
    description: string;
  }>({
    projectName: "",
    description: "",
  });
  console.log(projectName, description);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.close();
    }
    onClose?.();
    setIsModalOpen(false);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const validateForm = () => {
    let valid = true;
    const newErrorMessages = { projectName: "", description: "" };

    if (!projectName) {
      valid = false;
      newErrorMessages.projectName = "Project name is required.";
    }

    setErrorMessages(newErrorMessages);
    return valid;
  };
  
  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await request({
        url: `http://127.0.0.1:8000/api/v1/project/${projectId}/update/`,
        method: "PUT",
        withCredentials: false,
        data: {
          project_name: projectName,
          project_description: description,
        },
      });

      if (response.success) {
        // Call the update method passed from parent component
        onUpdateProject?.(projectId, projectName, description);

        setProjectName("");
        setDescription("");
        setErrorMessages({ projectName: "", description: "" });
        onClose?.();
      } else {
        setErrorMessages({
          projectName: "Failed to update project.",
          description: "",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setErrorMessages({
        projectName: "Failed to update project. Please try again.",
        description: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <dialog
        ref={dialogRef}
        id="modal_project"
        className="modal fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 flex flex-col justify-center items-center w-1/2 xl:w-1/2 2xl:w-1/3 p-5 rounded-xl shadow-xl border-[1px] z-50"
      >
        <motion.div
          initial="hidden"
          animate={isModalOpen ? "visible" : "hidden"}
          exit="exit"
          variants={modalVariants}
          className="modal-box w-full"
        >
          {/* Head - Modal */}
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="font-bold text-2xl">Edit Project</h1>
            <Button
              className="flex rounded-full !w-9 !h-9 border-gray-300 bg-gray-200 hover:bg-gray-300 hover:border-gray-300"
              onClick={handleClose}
              startContent={<CloseIcon className="!text-gray-800" />}
              children=""
              size="small"
              radius="full"
              color="secondary"
              isLoading={false}
              isIconOnly={true}
              isDisabled={false}
            />
          </div>
          <div className="border-t-[1px] w-full my-3" />
          {/* Body - Modal */}
          <form method="dialog" className="w-full">
            <div className="flex flex-col space-y-3 w-full justify-start items-start">
              <div className="w-full space-y-1">
                <div className="flex flex-row space-x-1">
                  <p>Project Name</p>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="text"
                  className="w-full p-3 py-[9px] outline-none rounded-xl focus:ring-2 focus:ring-indigo-600 border-[2px]"
                  placeholder="Project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
                {errorMessages.projectName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errorMessages.projectName}
                  </p>
                )}
              </div>
              <div className="w-full space-y-1">
                <p>Project Description</p>
                <input
                  type="text"
                  className="w-full p-3 py-[9px] outline-none rounded-xl focus:ring-2 focus:ring-indigo-600 border-[2px]"
                  placeholder="Project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errorMessages.description && (
                  <p className="text-red-600 text-sm mt-1">
                    {errorMessages.description}
                  </p>
                )}
              </div>
            </div>
          </form>
          {/* Footer - Modal */}
          <div className="flex justify-end my-3 space-x-3 w-full mt-7">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              transition={{ delay: 0.2 }}
            >
              <Button
                className="ml-auto !py-2 !px-4 border-2 border-blue-500"
                onClick={handleClose}
                children="Cancel"
                size="small"
                radius="2xl"
                color="outline"
                isLoading={false}
                isIconOnly={false}
                isDisabled={false}
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
              transition={{ delay: 0.3 }}
            >
              <Button
                className="ml-auto !py-2 !px-4 border-2 border-blue-500"
                onClick={handleUpdate}
                children="Update"
                size="small"
                radius="2xl"
                color="secondary"
                isLoading={isLoading}
                isIconOnly={false}
                isDisabled={isLoading}
              />
            </motion.div>
          </div>
        </motion.div>
      </dialog>
    </div>
  );
};

export default EditProject;
