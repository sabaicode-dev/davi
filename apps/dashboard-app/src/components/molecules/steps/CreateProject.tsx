import React, { useState } from "react";
import Joi from "joi";
import Logo from "@/public/images/step/step2_pic.png";
import Button from "@/src/components/atoms/Button";
import request from "@/src/utils/helper";
import axios from "axios";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
  projectName?: string; // Optional initial value for project name
  description?: string; // Optional initial value for description
}

const schema = Joi.object({
  projectName: Joi.string().trim().required().messages({
    "string.empty": "Please input your project name.",
  }),
  description: Joi.string().allow(""),
});

// Define a type with an index signature for error messages
type ErrorMessages = {
  [key: string]: string;
};

const CreateProject: React.FC<Step2Props> = ({
  onNext,
  onBack,
  projectName = "",
  description = "",
}) => {
  const [projectNameState, setProjectName] = useState(projectName || "");
  const [descriptionState, setDescription] = useState(description || "");

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    projectName: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false); // For loading spinner

  const handleNext = async () => {
    setIsLoading(true);

    try {
      const url_api = process.env.REACT_APP_API_URL;
      console.log(url_api);
      const response = await request({
        url: `${url_api}`,
        method: "POST",
        data: {
          project_name: projectNameState,
          project_description: descriptionState,
        },
      });
      console.log(url_api);
      console.log("Project creation response:", response);

      // Now you can properly check the status
      if (response.success || response.status === 201) {
        setErrorMessages({ projectName: "", description: "" });
        setProjectName("");
        setDescription("");
        onNext();
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
    <div className="mx-auto max-w-4xl p-10">
      <div className="flex ">
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

          <div className="h-[100px]">
            <div className="flex flex-row space-x-1">
              <label
                className="block text-sm font-bold text-gray-700 mb-2"
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

          <div className="mb-6">
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

          <div className="flex justify-end space-x-3">
            <Button
              onClick={onBack}
              children="Back"
              size="medium"
              radius="2xl"
              color="outline"
              isLoading={false}
              isIconOnly={false}
              isDisabled={false}
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
