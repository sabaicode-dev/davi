import React, { useState } from 'react';
import { SaveDialog } from './SaveVisualize';

function SaveVisualizeCard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (name: string) => {
    console.log('Saving with name:', name);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Open Save Dialog
      </button>

      <SaveDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default SaveVisualizeCard;