import React from "react";
import Button from "../../atoms/Button";
import { FaPlus } from "react-icons/fa6";
import DataSourceDetail from "../data-sources/DataSourceDetail";

const ProjectDetail: React.FC = () => {
  return (
    <div className="flex flex-col p-6 px-32">
      <div className="flex justify-between items-center w-full ">
        <div>
          <h1 className="font-bold text-lg">Title</h1>
          <p className="text-gray-700">Description</p>
        </div>
        <div className="justify-end items-end">
          <Button
            className="ml-auto py-3 !px-4 flex flex-row"
            onClick={() => alert("Hello")}
            startContent={<FaPlus />}
            children="Start New Project"
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
      <div>
      <DataSourceDetail/>
      </div>
    </div>
  );
};

export default ProjectDetail;
