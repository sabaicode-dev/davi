import React from "react";
import { useParams } from "react-router-dom";
import {
  SourceCSV,
  SourceSQLServer,
  SourceMongoDB,
  SourcePosgresSQL,
  SourceMariaDB,
  SourceMySQL,
  SourceWeb,
} from "../data-sources/ALLDataSource";

interface IPickDataSource {
  onNext?: () => void;
  onBack?: () => void;
  onSelectSource?: (source: string) => void;
}

const PickDataSource: React.FC<IPickDataSource> = ({ onBack }) => {
  const { projectId } = useParams();

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col">
      <div className="pt-8">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Pick a data source to start
        </h2>
      </div>

      {/* Data Sources Section */}
      <div className="px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
          <SourceCSV projectId={projectId} />
          <SourceWeb projectId={projectId} />
          <SourceMySQL projectId={projectId} />
          <SourceMongoDB projectId={projectId} />
          <SourceSQLServer projectId={projectId} />
          <SourcePosgresSQL projectId={projectId} />
          <SourceMariaDB projectId={projectId} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex-grow flex items-end justify-center pb-6">
        <div className="flex flex-row justify-center items-center">
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-200 rounded-full mx-1"></div>
        </div>
      </div>
    </div>
  );
};

export default PickDataSource;
