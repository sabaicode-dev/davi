import React from "react";
import Button from "@/src/components/atoms/Button";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const [searchParams] = useSearchParams();
  const projectId = location.state?.projectId || searchParams.get("projectId");
  console.log("ProjectId in PickDataSource:", projectId);
  console.log("Search params:", Object.fromEntries(searchParams.entries()));

  const handleBack = () => {
    // Navigate to the desired URL
    navigate("/project/create");
  };

  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Pick a data source to start
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full">
          <SourceCSV projectId={projectId} />
          <SourceWeb projectId={projectId} />
          <SourceMySQL projectId={projectId} />
          <SourceMongoDB projectId={projectId} />
          <SourceSQLServer projectId={projectId} />
          <SourcePosgresSQL projectId={projectId} />
          <SourceMariaDB projectId={projectId} />
        </div>
        <div className="flex flex-row justify-center items-center h-auto mt-36 w-full xl:mt-60 2xl:mt-80">
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-200 rounded-full mx-1"></div>
        </div>
        <div className="flex justify-end items-end w-full">
          <Button
            onClick={handleBack} // Use handleBack for navigation
            children="Back"
            size="medium"
            radius="2xl"
            color="outline"
            isLoading={false}
            isIconOnly={false}
            isDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PickDataSource;
