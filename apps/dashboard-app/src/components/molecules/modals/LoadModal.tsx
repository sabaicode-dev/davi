import React from "react";
import Button from "../../atoms/Button";

interface LoadModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const LoadModal: React.FC<LoadModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold">
          Are you sure you want to save this file?
        </h3>
        {/* <p className="text-base	font-medium text-gray-500">This action cannot be undone.</p> */}
        <div className="mt-4 flex space-x-4">
          <Button
            radius="large"
            color="outline"
            onClick={onClose}
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            radius="large"
            color="primary"
            onClick={onConfirm}
            className="w-full"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoadModal;
