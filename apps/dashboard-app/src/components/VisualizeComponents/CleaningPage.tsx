import React from "react";
import Button from "@/src/components/atoms/Button";
import icon from "@/public/images/icon-cleaning.png";
import TableTest from "@/src/components/atoms/TableTest";
import Input from "@/src/components/atoms/Input";
import { DeleteIcon, DownloadIcon } from "@/src/components/atoms/icons/Icon";
import { CiFilter } from "react-icons/ci";

const CleaningPage: React.FC = () => {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Content Left */}
        <div className="flex flex-row gap-x-3">
          <div className="flex rounded-full bg-[#F4EBFF] w-12 h-12 justify-center items-center">
            <img src={icon} alt="" className="w-5 h-6" />
          </div>
          <div>
            <h2 className="font-bold mb-1">Employee Survey.CSV</h2>
            <div className="bg-[#E6EDFF] border-2 border-[#E6EDFF] flex flex-row justify-between rounded-lg px-4 min-w-56 max-w-64">
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="text-sm">36</p>
                <p className="ml-3 text-sm"> Rows</p>
              </div>
              <p className="border-[1px] border-gray-700" />
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className=" text-sm">300</p>
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
          startContent={<DownloadIcon/>}
        />
      </div>
      <div className="flex flex-row justify-between items-center border-t-2 border-[#443DFF] ">
        <div className="flex justify-between items-center gap-x-4 max-w">
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
            className="my-4 w-full"
          />
          <Button
            size="medium"
            radius="2xl"
            isLoading={false}
            color="none"
            isIconOnly={true}
            startContent={<CiFilter  className="w-6 h-6"/>}
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
            startContent={<DeleteIcon/>}
          />
        </div>
      </div>
      <TableTest />
      <div className="flex justify-end items-center gap-x-4 mr-2 mt-6 max-h-12">
        <Button
          children={"Tranform"}
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
