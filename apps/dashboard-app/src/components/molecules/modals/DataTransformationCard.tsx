import { useState } from 'react';
import { Modal } from './Modal';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';

interface DataTransformationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataTransformationCard({ isOpen, onClose }: DataTransformationModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [showError, setShowError] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    outlierValues: true,
    deleteDuplicateRow: true,
  });

  const missingRowOptions = [
    { value: 'deleteMissingRow', label: 'Delete Missing Row' },
    { value: 'imputeByMean', label: 'Impute By Mean' },
    { value: 'imputeByMode', label: 'Impute By Mode' },
  ];

  const handleCheckboxChange = (name: keyof typeof checkboxes) => {
    setCheckboxes(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleAutoClean = () => {
    if (!selectedOption) {
      setShowError(true);
      return;
    }
    setShowError(false);
    console.log('Cleaning with options:', {
      ...checkboxes,
      missingRowOption: selectedOption,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Data Transformation Status">
      <div className="space-y-4">
        <p className="text-gray-600 mb-4">
          After running the transformation, we found the following data issues
        </p>

        <div className="space-y-3">
          <button 
            onClick={() => handleCheckboxChange('outlierValues')}
            className="flex items-center space-x-2 w-full text-left"
          >
            <div className="relative w-5 h-5">
              <div className={`absolute inset-0 ${checkboxes.outlierValues ? 'bg-blue-600' : 'border-2 border-gray-300'} rounded transition-colors`}></div>
              {checkboxes.outlierValues && (
                <Check className="absolute inset-0 w-5 h-5 text-white p-1" />
              )}
            </div>
            <span className="text-gray-900 text-base">Outlier Values</span>
          </button>

          <button 
            onClick={() => handleCheckboxChange('deleteDuplicateRow')}
            className="flex items-center space-x-2 w-full text-left"
          >
            <div className="relative w-5 h-5">
              <div className={`absolute inset-0 ${checkboxes.deleteDuplicateRow ? 'bg-blue-600' : 'border-2 border-gray-300'} rounded transition-colors`}></div>
              {checkboxes.deleteDuplicateRow && (
                <Check className="absolute inset-0 w-5 h-5 text-white p-1" />
              )}
            </div>
            <span className="text-gray-900 text-base">Delete Duplicate Row</span>
          </button>

          <div className="border-t pt-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-left font-medium text-gray-900"
            >
              <span>Missing Row</span>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {showError && !selectedOption && (
              <p className="text-red-500 text-sm mt-1">Require Select Column!</p>
            )}

            <div className={`mt-2 space-y-2 ${isExpanded ? 'block' : 'hidden'}`}>
              {missingRowOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 py-2 px-1 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="missingRow"
                    value={option.value}
                    checked={selectedOption === option.value}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      setShowError(false);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAutoClean}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Auto Clean
          </button>
        </div>
      </div>
    </Modal>
  );
}