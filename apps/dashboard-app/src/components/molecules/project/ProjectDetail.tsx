import React from "react";
import Button from "@/src/components/atoms/Button";
import { FaPlus } from "react-icons/fa6";
import DataSourceDetail from "../data-sources/DataSourceDetail";
import { useLocation, useNavigate } from "react-router-dom";

const ProjectDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectName, projectDescription } = location.state || {};

  const goToPickDataSource = () => {
    const projectId = location.pathname.split("/").pop();
    navigate(`/projects/${projectId}/data-sources`, {
      state: { projectId },
    });
  };

  return (
    <div className="flex flex-col p-6 px-40 ">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="font-bold text-lg">{projectName || "Title"}</h1>
          <p className="text-gray-700">{projectDescription || "Description"}</p>
        </div>
        <div className="justify-end items-end">
          <Button
            className="ml-auto py-3 !px-4 flex flex-row"
            onClick={goToPickDataSource}
            startContent={<FaPlus />}
            children="Create New File"
            size="small"
            radius="2xl"
            color="secondary"
            isLoading={false}
            isIconOnly={false}
            isDisabled={false}
          />
        </div>
      </div>
      <div className="border-b-2 border-[#443DFF] my-4" />
      <div className="">
        <DataSourceDetail />
      </div>
    </div>
  );
};

export default ProjectDetail;
