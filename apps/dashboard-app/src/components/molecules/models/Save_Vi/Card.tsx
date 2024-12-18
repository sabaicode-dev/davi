import React, { useState } from 'react';
import Modal from './SaveVisualize';

function CardSaveVisualize () {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false);
  const handleSave = () => {
    console.log('Saving...');
    setIsModalOpen(false);
  };
  const handleSaveNew = () => {
    console.log('Saving as new...');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <button
        onClick={handleOpenModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Open Modal
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        onSaveNew={handleSaveNew}
      />
    </div>
  );
}

export default CardSaveVisualize;