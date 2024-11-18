import { useEffect, useState } from "react";
import request from "@/src/utils/helper";
import { GetStart } from "../molecules/steps/GetStart";

export default function Project() {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await request({
          url: "http://127.0.0.1:8000/api/v1/projects/",
          method: "GET",
          data: {},
        });

        if (response && response.data && response.data.results) {
          setResponseData(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    getProject();
  }, []);

  useEffect(() => {
    console.log("Updated responseData:", responseData);
  }, [responseData]);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="w-full">
        <GetStart />
      </div>
    </div>
  );
}