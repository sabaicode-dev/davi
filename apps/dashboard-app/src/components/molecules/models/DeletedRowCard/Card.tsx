import React, { useState } from 'react';
import { DeleteCard } from './DeleteCard';

function CardDelete() {
  const [showDeleteCard, setShowDeleteCard] = useState(false);

  const handleDelete = () => {
    console.log('Deleting...');
    setShowDeleteCard(false);
  };

  const handleCancel = () => {
    setShowDeleteCard(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={() => setShowDeleteCard(true)}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Show Delete Dialog
      </button>

      {showDeleteCard && (
        <DeleteCard onDelete={handleDelete} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default CardDelete;