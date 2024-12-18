import React, { useState } from 'react';
import { X } from 'lucide-react';

interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export function SaveDialog({ isOpen, onClose, onSave }: SaveDialogProps) {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(name);
    setName('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="relative p-6">
          {/* Logo and Close Button */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <span className="text-orange-500 font-bold">B</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Save Visualize</h2>
            <p className="text-gray-600">Do you want to save or discard changes?</p>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Enter name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}