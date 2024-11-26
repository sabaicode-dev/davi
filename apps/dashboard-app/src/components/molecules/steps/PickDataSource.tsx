import React from "react";
import Button from "@/src/components/atoms/Button";
import SourceCSV from "@/src/components/molecules/data-sources/SourceCSV";
import SourceWeb from "@/src/components/molecules/data-sources/SourceWeb";
import SourceMySQL from "@/src/components/molecules/data-sources/SourceMySQL";
import SourceMongoDB from "@/src/components/molecules/data-sources/SourceMongoDB";
import { useLocation, useSearchParams } from "react-router-dom";

interface IPickDataSource {
  onNext?: () => void;
  onBack?: () => void;
  onSelectSource?: (source: string) => void;
}

const PickDataSource: React.FC<IPickDataSource> = ({
  onBack,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const projectId = location.state?.projectId || searchParams.get("projectId");
  console.log('ProjectId in PickDataSource:', projectId);
  console.log('Search params:', Object.fromEntries(searchParams.entries()));
  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Pick a data source to start
        </h2>
        <div className="flex flex-row  w-full space-x-5">
          <SourceCSV projectId={projectId}/>
          <SourceWeb projectId={projectId} />
          <SourceMySQL />
          <SourceMongoDB />
        </div>
        <div className="flex flex-row justify-center items-center h-auto mt-36 w-full xl:mt-60 2xl:mt-80">
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-600 rounded-full mx-1"></div>
          <div className="h-[4px] w-12 bg-blue-200 rounded-full mx-1"></div>
        </div>
        <div className="flex justify-end items-end w-full">
          <Button
            onClick={onBack}
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
