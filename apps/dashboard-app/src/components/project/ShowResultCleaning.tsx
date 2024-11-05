import React, { useState, useRef, useEffect } from "react";
import Button from "@/src/components/atoms/Button";
import icon from "@/public/images/icon-cleaning.png";
import TableTest from "@/src/components/molecules/tables/ShowCleaningResult";
import Input from "@/src/components/atoms/Input";
import {
  DeleteIcon,
  DownloadIcon,
  VisualizeIcon,
} from "@/src/components/atoms/icons/Icon";

import { CiFilter } from "react-icons/ci";
import RightSide from "../molecules/right-side/RightSide";
import DataTransformCard from "../atoms/DataTransformCard";

const ShowResuleCleaning: React.FC = () => {
  // State to manage the visibility of RightSide
  const [isRightSideVisible, setIsRightSideVisible] = useState(false);
  // State to manage the visibility of DataTransformCard
  const [isDataTransformVisible, setIsDataTransformVisible] = useState(false);

  const rightSideRef = useRef<HTMLDivElement | null>(null);
  const dataTransformRef = useRef<HTMLDivElement | null>(null);

  // Function to handle showing the RightSide component
  const showRightSide = () => {
    setIsRightSideVisible(true);
  };

  const hideRightSide = () => {
    setIsRightSideVisible(false);
  };

  // Function to show DataTransformCard
  const showDataTransform = () => {
    setIsDataTransformVisible(true);
  };

  // Function to hide DataTransformCard
  const hideDataTransform = () => {
    setIsDataTransformVisible(false);
  };

  // Event listener to detect clicks outside RightSide or DataTransformCard to hide them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rightSideRef.current &&
        !rightSideRef.current.contains(event.target as Node)
      ) {
        hideRightSide();
      }
      if (
        dataTransformRef.current &&
        !dataTransformRef.current.contains(event.target as Node)
      ) {
        hideDataTransform();
      }
    };

    // Attach the event listener when either component is visible
    if (isRightSideVisible || isDataTransformVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRightSideVisible, isDataTransformVisible]);

  return (
    <div className="relative flex flex-col mt-8" style={{ width: "100%" }}>
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
        <div className="flex flex-row gap-x-4">
          <Button
            children={"Download"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="outline"
            startContent={<DownloadIcon />}
          />
          <Button
            children={"Visualize"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="primary"
            onClick={showRightSide} // Show RightSide on click
            startContent={<VisualizeIcon />}
          />
        </div>
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
            isIconLeft={true}
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

      {/* Conditionally render RightSide based on visibility state */}
      {isRightSideVisible && (
        <div
          ref={rightSideRef}
          className="fixed top-16 right-2 w-[400px] h-screen bg-white shadow-lg z-50 overflow-y-scroll"
        >
          <RightSide onClose={hideRightSide} />
        </div>
      )}

      {/* Conditionally render DataTransformCard as a pop-up */}
      {isDataTransformVisible && (
        <div
          ref={dataTransformRef}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div>
            <DataTransformCard hideDataTransform={hideDataTransform} />
          </div>
        </div>
      )}

      <div className="flex justify-end items-end space-x-5 mt-5">
        <Button
          color="outline"
          radius="medium"
          size="medium"
          onClick={showDataTransform} // Show DataTransformCard on click
        >
          Transform
        </Button>
        <Button radius="medium" size="medium" color="secondary">
          Next
        </Button>
      </div>
    </div>
  );
};

export default ShowResuleCleaning;
