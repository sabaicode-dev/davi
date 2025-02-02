import React, { useState } from "react";
import Joi from "joi";
import Logo from "@/public/images/step/step2_pic.png";
import Button from "@/src/components/atoms/Button";
import request from "@/src/utils/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
interface Step2Props {
  onNext?: () => void;
  onBack?: () => void;
  projectName?: string;
  description?: string;
}

// Joi schema for validation
const schema = Joi.object({
  projectName: Joi.string().trim().required().messages({
    "string.empty": "Please input your project name.",
  }),
  description: Joi.string().max(255).allow(""),
});

type ErrorMessages = {
  [key: string]: string;
};

const CreateProject: React.FC<Step2Props> = ({
  onNext,
  projectName = "",
  description = "",
}) => {
  const [projectNameState, setProjectName] = useState(projectName || "");
  const [descriptionState, setDescription] = useState(description || "");
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    projectName: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const goBackToGetStart = () => {
    navigate("/");
  };

  const validateForm = () => {
    const { error } = schema.validate(
      { projectName: projectNameState, description: descriptionState },
      { abortEarly: false }
    );

    if (error) {
      const newErrorMessages: ErrorMessages = {
        projectName: "",
        description: "",
      };

      error.details.forEach((err) => {
        if (err.path[0] === "projectName") {
          newErrorMessages.projectName = err.message;
        } else if (err.path[0] === "description") {
          newErrorMessages.description = err.message;
        }
      });

      setErrorMessages(newErrorMessages);
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/projects/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          project_name: projectNameState,
          project_description: descriptionState,
        },
      });
      const newProjectId = response.data._id;
      navigate(`/projects/${newProjectId}/data-sources`);

      if (response.success || response.status === 201) {
        setErrorMessages({ projectName: "", description: "" });
        setProjectName("");
        setDescription("");
        onNext?.();
      } else {
        setErrorMessages({
          projectName: "Failed to create project. Unexpected status.",
          description: "",
        });
      }
    } catch (error) {
      console.error("Failed to create project:", error);
      if (axios.isAxiosError(error)) {
        setErrorMessages({
          projectName:
            error.response?.data?.message ||
            "Failed to create project. Please try again.",
          description: "",
        });
      } else {
        setErrorMessages({
          projectName: "Failed to create project. Please try again.",
          description: "",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-1">
      <div className="flex">
        {/* Left Image Section */}
        <div className="flex-1 p-8">
          <img src={Logo} alt="Project Created" className="w-full h-auto" />
        </div>

        {/* Right Form Section */}
        <div className="flex-1 p-8">
          <h2 className="text-lg font-semibold text-black mb-2">
            Project created
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Please enter a Name and Description for this project.
          </p>

          <div className="h-[100px] flex flex-col space-y-1">
            <div className="flex flex-row space-x-1">
              <label
                className="block text-sm font-bold text-gray-700"
                htmlFor="projectName"
              >
                Project name
              </label>
              <p className="text-red-500">*</p>
            </div>
            <input
              type="text"
              id="projectName"
              placeholder="Enter name..."
              value={projectNameState}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errorMessages.projectName && (
              <p className="text-red-600 text-sm mt-1">
                {errorMessages.projectName}
              </p>
            )}
          </div>

          <div className="mb-6 mt-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="description"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              placeholder="Enter details to visualize and showcase your product information efficiently"
              value={descriptionState}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            ></textarea>
            {errorMessages.description && (
              <p className="text-red-600 text-sm mt-1">
                {errorMessages.description}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              onClick={goBackToGetStart}
              children="Back"
              size="medium"
              radius="2xl"
              color="outline"
              isLoading={false}
              isIconOnly={false}
              isDisabled={false}
              className="!py-2 !px-4"
            />
            <Button
              onClick={handleNext}
              children="Next"
              size="small"
              radius="2xl"
              color="secondary"
              isLoading={isLoading}
              isIconOnly={false}
              isDisabled={isLoading}
              className="!px-5"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <div className="h-1 w-8 bg-blue-600 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-200 rounded-full mx-1"></div>
        <div className="h-1 w-8 bg-blue-200 rounded-full mx-1"></div>
      </div>
    </div>
  );
};

export default CreateProject;
