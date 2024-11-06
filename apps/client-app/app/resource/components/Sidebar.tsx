import React from 'react';

interface SidebarProps {
  onSelect: (section: string) => void;
  selectedSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect, selectedSection }) => {
  return (
    <div className="p-6 md:fixed md:top-16 md:left-64">
      <h2 className="text-[16px] font-bold mb-4">DAVI Documentation</h2>

      <div className="space-y-2 text-[14px]">
        <button 
          onClick={() => onSelect('learn-about-davi')} 
          className={`${
            selectedSection === 'learn-about-davi' ? 'text-blue-600 font-semibold' : 'text-gray-600'
          } hover:text-blue-800`}
        >
          Learn about DAVI
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold mb-2">Integrations</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onSelect('upload-file')}
              className={`${
                selectedSection === 'upload-file' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } hover:text-blue-800`}
            >
              Upload File
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('scraping')}
              className={`${
                selectedSection === 'scraping' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } hover:text-blue-800`}
            >
              Scraping
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-bold mb-2">Data Visualize</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onSelect('cleaning')}
              className={`${
                selectedSection === 'cleaning' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } hover:text-blue-800`}
            >
              Data Cleaning
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('analysis')}
              className={`${
                selectedSection === 'analysis' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } hover:text-blue-800`}
            >
              Analysis
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelect('visualize')}
              className={`${
                selectedSection === 'visualize' ? 'text-blue-600 font-semibold' : 'text-gray-600'
              } hover:text-blue-800`}
            >
              Visualize
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;