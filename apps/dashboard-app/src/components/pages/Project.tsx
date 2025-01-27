import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "@/src/components/molecules/loading/Spinner";
import SelectProject from "@/src/components/molecules/steps/ShowProject";

export default function Project() {
  const [responseData, setResponseData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect to the "Get Started" page if there are no projects
  useEffect(() => {
    if (!isLoading && responseData.length === 0) {
      navigate("/get-started");
    }
  }, [isLoading, responseData, navigate]);

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
        ) : null}
      </SelectProject>
    </div>
  );
}