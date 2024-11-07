import React, { useState } from "react";
import Logo from "@/public/images/step/step2_pic.png";
import Button from "@/src/components/atoms/Button";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    projectName: "",
    description: "",
  });

  const handleNext = () => {
    let isValid = true;
    const newErrorMessages = { projectName: "", description: "" };

    if (projectName.trim() === "") {
      newErrorMessages.projectName = "Please input your project name.";
      isValid = false;
    }

    // Description is now optional, so no validation error is set for it
    // You can add any additional logic here if you want to validate the description in the future

    setErrorMessages(newErrorMessages);

    if (isValid) {
      onNext(); // Proceed to the next step if project name is valid
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

          <div className="mb-4">
            <label
              className="block text-sm font-bold text-gray-700 mb-2"
              htmlFor="projectName"
            >
              Project name
            </label>
            <input
              type="text"
              id="projectName"
              placeholder="Enter name..."
              value={projectName}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={3}
            ></textarea>
            {/* You can still display error for description if you want in the future */}
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
              isLoading={false}
              isIconOnly={false}
              isDisabled={false}
            />
          </div>

          {/* Step indicator */}
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

export default Step2;
