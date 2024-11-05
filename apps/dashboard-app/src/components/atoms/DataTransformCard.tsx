import React from "react";
import Button from "./Button";
import CloseIcon from "@/public/images/Close-Icon.png";
import CandleICon from "@/public/images/candle-2.png";
interface DataTransformCardProps {
  hideDataTransform: () => void;
}

const DataTransformCard: React.FC<DataTransformCardProps> = ({
  hideDataTransform,
}) => {
  return (
    <>
      {/* data transform card */}
      <div className="container w-[544px] absolute top-48 transform -translate-x-1/2 left-1/2 z-50">
        <div className="p-5 w-full  bg-white rounded-xl  shadow  space-y-5">
          <div className="inline-flex w-full space-x-5">
            <div className="bg-[#ECFDF3] w-[90px] rounded-full flex justify-center items-center">
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
              <button onClick={hideDataTransform}>
                <img src={CloseIcon} alt="" width={20} />
              </button>
            </div>
          </div>

          <section className="flex flex-col ml-32 text-[18px]">
            <div>Total number of empty column: 1</div>
            <div>Total number of empty row: 1</div>
          </section>
          <div className="flex justify-end items-end space-x-5 text-center">
            <Button radius="medium" color="outline">
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
