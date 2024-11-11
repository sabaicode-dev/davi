import React, { useState, useRef } from "react";
import Button from "./Button";
import CandleICon from "@/public/images/candle-2.png";
import { CloseModalIcon } from "./icons/Icon";
import DataTransformInput from "./Data-Transform-Input";
interface DataTransformCardProps {
  numbers: {
    columnNumber: number;
    rowNumber: number;
  };
  hideDataTransform: () => void;
}

const DataTransformCard: React.FC<DataTransformCardProps> = ({
  hideDataTransform,
  numbers,
}) => {
  const [isDataTransformInputVisible, setIsDataTransformInputVisible] =
    useState(false);

  const dataTransformInputRef = useRef<HTMLDivElement | null>(null);
  // Function to show DataTransformCard
  const showDataTransformInput = () => {
    setIsDataTransformInputVisible(true);
  };

  // Function to hide DataTransformCard
  const hideDataTransformInput = () => {
    setIsDataTransformInputVisible(false);
  };
  return (
    <>
      {/* data transform card */}
      <div className="container w-[544px] h-[300px] absolute top-72 transform -translate-x-1/2 left-1/2 z-50">
        <div className="p-5 w-full  bg-white rounded-xl  shadow  space-y-9 h-full">
          <div className="inline-flex w-full space-x-5">
            <div className="bg-[#ECFDF3] w-[85px] rounded-full flex justify-center items-center">
              <div className="bg-[#D1FADF] p-3 rounded-full">
                <img src={CandleICon} alt="" width={24} />
              </div>
            </div>
            <header>
              <h1 className="font-semibold text-[18px]">
                Data Transformation Status
              </h1>
              <p className="text-[14px] text-[#475467]">
                After running the transformation, we found the following data
                issues
              </p>
            </header>
            <div>
              <Button
                type="button"
                onClick={hideDataTransform}
                children={<CloseModalIcon />}
                color="none"
                className="text-red-500 !p-0 !bg-transparent"
              />
              {/* <button onClick={hideDataTransform}>
                <img src={CloseIcon} alt="" width={20} />
              </button> */}
            </div>
          </div>

          <section className="flex flex-col ml-32 text-[18px] space-y-3">
            <div>Total number of empty column: {numbers.columnNumber}</div>
            <div>Total number of empty row: {numbers.rowNumber}</div>
          </section>
          {isDataTransformInputVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div>
                <DataTransformInput
                  hideDataTransformInput={hideDataTransformInput}
                />
              </div>
            </div>
          )}
          <div className="flex justify-end items-end space-x-5 text-center">
            <Button
              radius="medium"
              color="outline"
              onClick={showDataTransformInput}
            >
              Preview
            </Button>
            <Button radius="medium" color="secondary">
              Auto Clean
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTransformCard;
