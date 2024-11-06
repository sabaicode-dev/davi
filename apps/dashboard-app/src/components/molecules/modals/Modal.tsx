import React from "react";
import SaveModalIcon from "@/public/images/modals/SaveModalIcon.png";
import SavedVisualize from "@/public/images/modals/saved_visualize.png";
import Button from "@/src/components/atoms/Button";
import { CloseModalIcon } from "@/src/components/atoms/icons/Icon";
import Input from "@/src/components/atoms/Input";

interface ModalProps {
  isNewUser: boolean;
  existingVisualizations?: string[];
}

// Mock data for existing visualizations
const mockVisualizations = [
  "Visualization 1",
  "Visualization 2",
  "Visualization 3",
  "Visualization 4",
  "Visualization 5",
  "Visualization 6",
  "Visualization 7",
  "Visualization 8",
  "Visualization 9",
];

const Modal: React.FC<ModalProps> = ({
  isNewUser,
  existingVisualizations = mockVisualizations,
}) => {
  return (
    <div
      className="save-dialog flex flex-col z-0 top-56 absolute px-6 py-6 bg-slate-100 shadow-xl gap-y-4 rounded-xl !w-[450px] h-[430px]"
      style={{ width: "30%" }}
    >
      {/* Header */}
      <div className="flex flex-row dialog-header justify-between">
        <img src={SaveModalIcon} alt="Save Modal Icon" />
        <Button
          isIconOnly={true}
          startContent={<CloseModalIcon />}
          className="bg-transparent hover:bg-transparent hover:bg-slate-300 w-12 h-12"
          radius="full"
        />
      </div>

      {/* Body */}
      <div className="dialog-body flex flex-col gap-y-2">
        <h2 className="text-[18px] font-bold">Save Visualize</h2>

        {isNewUser ? (
          <>
            <p className="text-[14px]">
              Do you want to save or discard changes?
            </p>
            <Input placeholder="Enter name..." isReadOnly={false} size="lg" />
          </>
        ) : (
          <>
            <p className="text-[14px]">Here are your saved visualizations:</p>
            <ul
              className="existing-visualizations-list list-disc ml-4 overflow-y-auto"
              style={{ maxHeight: "150px" }}
            >
              {existingVisualizations.map((viz, index) => (
                <div className="flex flex-col gap-y-3">
                  <li key={index} className="text-[14px]">
                    <div className="flex flex-row justify-between items-center hover:bg-indigo-200 px-4 py-2  hover:rounded-lg">
                      <img src={SavedVisualize} alt="" className="w-14 h-14" />{" "}
                      <p className="text-xl">{viz}</p>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="dialog-footer flex justify-between items-center mt-8">
        <Button
          isIconOnly={false}
          color="outline"
          children={"Cancel"}
          radius="2xl"
        />
        <Button
          isIconOnly={false}
          color="secondary"
          children={"Save"}
          radius="2xl"
        />
      </div>
    </div>
  );
};


export default Modal
