import React from "react";
import Button from "./Button";
import CloseIcon from "@/public/images/Close-Icon.png";
import TableTest from "@/src/components/molecules/tables/ShowCleaningResult";
const DataTransformInput = () => {
  return (
    <>
      <div className="container max-w-[1135px] w-full z-50">
        <div className="bg-slate-200 p-5 rounded-xl space-y-5">
          <header className="flex justify-between items-center">
            <h1 className="font-semibold text-[18px]">Input field empty</h1>
            <div>
              <img src={CloseIcon} alt="" width={16} />
            </div>
          </header>
          <div className="mx-12">
            <div>
              <div className="flex justify-end items-end">
                <Button color="danger" radius="medium">
                  Delete
                </Button>
              </div>
              <div className="mt-5">
                <TableTest />
              </div>
            </div>
            <div className="flex justify-end items-end space-x-5 text-center">
              <Button radius="medium" color="outline">
                Cancel
              </Button>
              <Button radius="medium" color="secondary">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTransformInput;
