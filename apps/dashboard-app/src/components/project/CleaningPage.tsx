import React from "react";
import Button from "@/src/components/atoms/Button";
import icon from "@/public/images/icon-cleaning.png";
import TableTest from "@/src/components/molecules/tables/CleaningPage"; // Ensure this component supports your needs
import Input from "@/src/components/atoms/Input";
import { DeleteIcon, DownloadIcon } from "@/src/components/atoms/icons/Icon";
import { CiFilter } from "react-icons/ci";
import Link from 'next/link';

const CleaningPage: React.FC = () => {
  return (
    <div className="flex flex-col mt-8" style={{ width: "100%" }}>
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Content Left */}
        <div className="flex flex-row gap-x-3 justify-center items-center">
          <div className="flex rounded-full bg-[#F4EBFF] w-12 h-12 justify-center items-center">
            <img src={icon} alt="" className="w-5 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold mb-1">Employee Survey.CSV asdfasfasd</h2>
            <div className="bg-[#E6EDFF] border-2 border-[#E6EDFF] flex flex-row justify-between rounded-lg px-4 min-w-56 max-w-64">
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="text-sm">36</p>
                <p className="ml-3 text-sm"> Rows</p>
              </div>
              <p className="border-[1px] border-gray-700" />
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="text-sm">300</p>
                <p className="ml-3 text-sm"> Columns</p>
              </div>
            </div>
          </div>
        </div>
        {/* Content Right */}
        <Button
          children={"Download"}
          size="medium"
          radius="2xl"
          isLoading={false}
          color="outline"
          startContent={<DownloadIcon />}
        />
      </div>
      <div className="flex flex-row justify-between items-center border-t-2 border-[#443DFF] ">
        <div
          className="flex justify-between items-center gap-x-4 my-4"
          style={{ width: "60%" }}
        >
          <Input
            type="text"
            label=""
            placeholder="What do you want to do with your data"
            defaultValue=""
            size="md"
            color="secondary"
            variant="bordered"
            radius="2xl"
            labelPlacement="outside"
            isDisabled={false}
            isReadOnly={false}
            isRequired={false}
            className="max-w-input w-full"
          />
          <Button
            size="medium"
            radius="2xl"
            isLoading={false}
            color="none"
            isIconOnly={true}
            startContent={<CiFilter className="w-6 h-6" />}
            className="border-2 border-[#E6EDFF]"
          />
        </div>
        <div>
          <Button
            children={"Delete"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="danger"
            startContent={<DeleteIcon />}
          />
        </div>
      </div>

      {/* Wrap TableTest in a scrollable container */}
      <div className="overflow-x-auto">
        <TableTest />
      </div>

      <div className="flex justify-end items-center gap-x-4 mr-2 mt-6 max-h-12">
        <Button
          children={"Transform"}
          size="medium"
          radius="2xl"
          isLoading={false}
          color="outline"
          isIconOnly={false}
        />
        <Button
          children={"Next"}
          size="medium"
          radius="2xl"
          isLoading={false}
          color="secondary"
          isIconOnly={false}
        />
      </div>
    </div>
  );
};

export default CleaningPage;
