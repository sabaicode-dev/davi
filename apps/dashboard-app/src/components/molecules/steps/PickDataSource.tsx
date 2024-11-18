import React from "react";
import Button from "@/src/components/atoms/Button";
import SourceCSV from "../data-sources/SourceCSV";
import SourceWeb from "../data-sources/SourceWeb";
import SourceMySQL from "../data-sources/SourceMySQL";
import SourceMongoDB from "../data-sources/SourceMongoDB";

interface IPickDataSource {
  onNext?: () => void;
  onBack?: () => void;
  onSelectSource?: (source: string) => void;
}

const PickDataSource: React.FC<IPickDataSource> = ({
  onBack,
}) => {
  return (
    <div className="py-6 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Pick a data source to start
        </h2>
        <div className="flex flex-row  w-full space-x-5">
          <SourceCSV />
          <SourceWeb />
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
