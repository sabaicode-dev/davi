import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  SaveVisualizeIcon,
  FileVisualizeIcon,
} from "@/src/components/atoms/icons/Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  onSaveNew: () => void;
  savedVisualizations?: any[]; // Pass saved visualizations as a prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onSaveNew,
  savedVisualizations = [],
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
    }
  }, [isOpen]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      setName("");
    }
  };

  const handleSaveNew = () => {
    onClose(); // Close the current modal
    setTimeout(() => {
      onSaveNew(); // Open SaveDialog after the modal closes
    }, 100); // Small delay to ensure proper state update
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-lg">
        <div className="relative p-6">
          {/* Header with Icon and Close Button */}
          <div className="flex justify-between items-center mb-4">
            <div className="w-11 h-11 rounded-full bg-orange-100 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center">
                <span className="text-orange-500 text-xl font-bold">
                  <SaveVisualizeIcon />
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Title and Description */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900">Save Visualize</h2>
            <p className="text-gray-600">
              Do you want to save or discard changes?
            </p>
          </div>

          {/* Content */}
          <div className="max-h-[300px] overflow-y-scroll">
            {savedVisualizations.map((viz, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                onClick={() => setName(viz.name)}
              >
                <span className="bg-[#F4EBFF] rounded-full w-10 h-10 flex justify-center items-center">
                  <FileVisualizeIcon />
                </span>
                <span className="text-gray-700">{viz.name}</span>
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSaveNew}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Save New
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
                name.trim()
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!name.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
