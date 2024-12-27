import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { SaveVisualizeIcon } from "@/src/components/atoms/icons/Icon";

interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function SaveDialog({ isOpen, onClose, onSave }: SaveDialogProps) {
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

          {/* Input Field */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Enter name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
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
}
