import React, { useContext, useEffect, useState } from "react";
import icon from "@/public/images/icon-cleaning.png";
import Button from "../../atoms/Button";
import { DeleteIcon, DownloadIcon } from "../../atoms/icons/Icon";
import Input from "../../atoms/Input";
import { CiFilter } from "react-icons/ci";
import TableProject from "../tables/TableProject";
import { useNavigate } from "react-router-dom";



const SpeadsheetTable: React.FC = () => {
  const [fileDetails, setFileDetails] = useState({
    filename: "Employee Survey.CSV",
    totalRows: 0,
    totalColumns: 0,
  });

  const handleFileDetailsUpdate = (details: {
    filename: string;
    totalRows: number;
    totalColumns: number;
  }) => {
    setFileDetails(details);
  };
  return (
    <div
      className="flex flex-col overflow-hidden mt-8 h-[200px]"
      style={{ width: "100%", height: "30%" }}
    >
      <div className="flex flex-row justify-between items-center mb-3">
        {/* Content Left */}
        <div className="flex flex-row gap-x-3 justify-center items-center">
          <div className="flex rounded-full bg-[#F4EBFF] w-12 h-12 justify-center items-center">
            <img src={icon} alt="" className="w-5 h-6" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold mb-1">{fileDetails.filename}</h2>
            <div className="bg-[#E6EDFF] border-2 border-[#E6EDFF] flex flex-row justify-between rounded-lg px-4 min-w-56 max-w-64">
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="text-sm">{fileDetails.totalRows}</p>
                <p className="ml-3 text-sm"> Rows</p>
              </div>
              <p className="border-[1px] border-gray-700" />
              <div className="flex flex-row min-w-20 max-w-28 px-4">
                <p className="text-sm">{fileDetails.totalColumns}</p>
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
      <div className="flex flex-row  justify-between items-center border-t-2 border-[#443DFF] ">
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
      <div className="">
        <TableProject onFileDetailsUpdate={handleFileDetailsUpdate} />
      </div>
    </div>
  );
};

export default SpeadsheetTable;
