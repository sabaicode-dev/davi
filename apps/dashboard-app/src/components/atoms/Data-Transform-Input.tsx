import React from "react";
import Button from "./Button";
import { CloseModalIcon } from "./icons/Icon";
import Table from "../molecules/tables/Table";
type DataTransformInputProps = {
  hideDataTransformInput: () => void;
};
const DataTransformInput = ({
  hideDataTransformInput,
}: DataTransformInputProps) => {
  const headers = [
    { label: "Country", key: "country" },
    { label: "Population", key: "population" },
    { label: "Yearly change", key: "yearly change" },
    { label: "Net change", key: "net change" },
    { label: "Density", key: "density" },
  ];
  const data = [
    {
      country: "China",
      population: 1402112000,
      "yearly change": "0.1%",
      "net change": 1400000,
      density: "148",
    },
    {
      country: "India",
      population: 1380004000,
      "yearly change": "0.8%",
      "net change": 11000000,
      density: "420",
    },
    {
      country: "United States",
      population: 331002651,
      "yearly change": "0.7%",
      "net change": 2300000,
      density: "36",
    },
    {
      country: "Indonesia",
      population: 273523615,
      "yearly change": "1.0%",
      "net change": 2700000,
      density: "151",
    },
    {
      country: "Pakistan",
      population: 225199937,
      "yearly change": "2.0%",
      "net change": 4400000,
      density: "287",
    },
    {
      country: "Brazil",
      population: 212559417,
      "yearly change": "0.5%",
      "net change": 1000000,
      density: "25",
    },
    // {
    //   country: "Nigeria",
    //   population: 206139589,
    //   "yearly change": "2.6%",
    //   "net change": 5300000,
    //   density: "223",
    // },
    // {
    //   country: "Bangladesh",
    //   population: 166303498,
    //   "yearly change": "1.0%",
    //   "net change": 1600000,
    //   density: "1265",
    // },
    // {
    //   country: "Russia",
    //   population: 145912025,
    //   "yearly change": "-0.2%",
    //   "net change": -300000,
    //   density: "9",
    // },
    // {
    //   country: "Mexico",
    //   population: 128932753,
    //   "yearly change": "1.2%",
    //   "net change": 1500000,
    //   density: "66",
    // },
  ];

  return (
    <>
      <div className="container w-[1135px] z-50">
        <div className="bg-slate-100 p-5 rounded-xl space-y-5 shadow">
          <header className="flex justify-between items-center">
            <h1 className="font-semibold text-[18px]">Input field empty</h1>
            <Button
              type="button"
              children={<CloseModalIcon />}
              onClick={hideDataTransformInput}
              color="none"
              className="text-red-500 !p-0 !bg-transparent"
            />
          </header>
          <div className="mx-12">
            <div>
              <div className="flex justify-end items-end">
                <Button color="danger" radius="medium">
                  Delete
                </Button>
              </div>
              <div className="mt-5">
                <Table
                  headers={headers}
                  data={data}
                  showCheckbox={true}
                  showIndex={true}
                  editable={true}
                  allowColumnSelection={true}
                  selectableColumns={["name", "email"]} // Example of selectable columns
                  firstRowHasChildren={false}
                />
              </div>
            </div>
            <div className="flex justify-end items-end space-x-5 text-center mt-5">
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
