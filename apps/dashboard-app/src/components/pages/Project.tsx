import { GetStart } from "@/src/components/molecules/steps/GetStart";
import Spinner from "@/src/components/loading/Spinner";
import SelectProject from "@/src/components/molecules/steps/ShowProject";
import { useState } from "react";

export default function Project() {
  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex w-full justify-center items-center">
      <SelectProject
        onDataFetch={(data) => {
          setResponseData(data);
          setIsLoading(false);
        }}
        onError={(errorMessage) => {
          setError(errorMessage);
          setIsLoading(false);
        }}
      >
        {isLoading ? (
          <div className="flex w-full justify-center items-center h-full">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : responseData.length === 0 ? (
          <GetStart />
        ) : null}
      </SelectProject>
    </div>
  );
}