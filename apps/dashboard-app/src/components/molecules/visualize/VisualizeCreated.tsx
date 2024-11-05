import React from "react";
import Button from "@/src/components/atoms/Button";
import Input from "@/src/components/atoms/Input";
import { FaPlus } from "react-icons/fa6";
import { SortIcon } from "@/src/components/atoms/icons/Icon";
import SaveImage from "@/public/images/saveImage.png";
import { DeleteIconCardVisualize } from "@/src/components/atoms/icons/Icon";

const VisualizeCreated: React.FC = () => {
  return (
    <div className="flex flex-col w-full px-12">
      <h1 className="font-bold text-[20px] mt-4">Visualize</h1>
      {/* Head */}
      <div className="flex flex-row justify-between items-center mt-4">
        {/* Left */}
        <div className="flex flex-row">
          <Button
            children={<SortIcon />}
            color="none"
            className="!bg-transparent !hover:bg-gray-500"
            radius="full"
          />
          <Input
            type="text"
            label=""
            placeholder="What do you want to do with your data"
            defaultValue=""
            size="lg"
            color="secondary"
            variant="bordered"
            radius="2xl"
            labelPlacement="outside"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
            isIconLeft={true}
            className="max-w-input min-w-[600px] w-[700px]"
          />
        </div>
        {/* Right */}
        <div>
          <div>
            <Button
              children={"Start New Project"}
              size="medium"
              radius="2xl"
              isLoading={false}
              color="secondary"
              startContent={<FaPlus />}
            />
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-col justify-between items-center mt-4 gap-y-4">
        <CardVisualize />
        <CardVisualize />
        <CardVisualize />
      </div>
    </div>
  );
};

export default VisualizeCreated;

const CardVisualize = () => {
  return (
    <div className="flex flex-row justify-between items-center w-full bg-[#EBF1FF] h-[72px] rounded-lg ">
      {/* Left */}
      <div className="flex items-center gap-x-8 ">
        <p className="text-[14px] ml-4">#1</p>
        <div className="flex flex-row gap-x-4">
          <img src={SaveImage} alt="" className="w-12 h-12" />
          <div className="flex flex-col">
            <h1 className="text-[14px] font-bold">Tech requirements.csv</h1>
            <div className="flex text-[10px] text-gray-500 gap-x-4">
              <p>Last Tuesday at 1:29 PM</p>
              <p>200 KB</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right */}
      <div>
        <Button
          children={<DeleteIconCardVisualize />}
          color="none"
          className="!bg-transparent !hover:bg-gray-500"
          radius="full"
        />
      </div>
    </div>
  );
};
