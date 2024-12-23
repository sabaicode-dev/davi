import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteCardProps {
  onDelete: () => void;
  onCancel: () => void;
}

export function DeleteCard({ onDelete, onCancel }: DeleteCardProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-50 rounded-full">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">Delete Row</h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete this Row? This action cannot be undone.
            </p>
          </div>
          
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}