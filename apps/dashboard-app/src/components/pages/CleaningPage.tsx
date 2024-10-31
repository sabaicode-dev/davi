import React from "react";
import Button from "../atoms/Button";
import icon from "@/public/images/icon-cleaning.png";
import TableTest from "../atoms/TableTest";
import Input from "../atoms/Input";

const CleaningPage = () => {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Content Left */}
        <div className="flex flex-row gap-x-3">
          <div className="flex rounded-full bg-[#F4EBFF] w-14 h-1w-14 justify-center items-center">
            <img src={icon} alt="" className="w- h-6" />
          </div>
          <div>
            <h2 className="font-bold">Employee Survey.CSV</h2>
            <div className="bg-[#E6EDFF] border-2 border-[#E6EDFF] flex flex-row justify-between rounded-lg px-4 min-w-56 max-w-64">
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="">36</p>
                <p className="ml-3"> Rows</p>
              </div>
              <p className="border-[1px] border-gray-700" />
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="">36</p>
                <p className="ml-3"> Columns</p>
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
          isIconOnly={false}
        />
      </div>
      <div>
        <div className="border-t-2 border-[#443DFF] flex justify-start items-center gap-x-4">
          <Input
            type="text-area"
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
            className="min-w-[900px] max-w-80 my-4"
            // description="Please enter your fullname"
          />
          <Button
            children={"Just Icons"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="secondary"
            isIconOnly={false}
          />
        </div>
      </div>
      <TableTest />
      <div className="flex justify-end items-center gap-x-4 mr-2 mt-6">
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
