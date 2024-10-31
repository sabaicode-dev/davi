//? **************************************************
//* **************************************************
//? **************************************************

import { BarChart } from "../molecules/charts/BarChart";
import { BooleanChart } from "../molecules/charts/BooleanChart";
import { Category } from "../molecules/charts/Catagory";
import { LineChart } from "../molecules/charts/LineChart";
import { PieChart } from "../molecules/charts/PieChart";
import { Number } from "../molecules/charts/Number";

//!   T E S T I N G       C H A R T       U I
//!
//!      _____    __  __   ______  __     __     _    __  _____
//!     / ____)  |  \/  | |  ____) \ \   / /    | |  | | |____|
//!     | (___   | \  / | | |__     \ \_/ /     | |  | |  | |
//!      \___ \  | |\/| | |  __|     \   /      | |  | |  | |
//!      ____) | | |  | | | |____     | |       | |__| | _| |_
//!     |_____/  |_|  |_| |______|    |_|        \____/ |____|
//!
//!
//? **************************************************
//* **************************************************
//? **************************************************

type DataItem = { category: string };
type DataItemNum = { category: number };

const Boolean_Data = [
  { user_name: "Vuthy", Boolean: false },
  { user_name: "A", Boolean: true },
  { user_name: "B", Boolean: false },
  { user_name: "C", Boolean: true },
  { user_name: "Thai", Boolean: false },
  { user_name: "Sophea", Boolean: true },
  { user_name: "Zhileang", Boolean: true },
  { user_name: "Sothea", Boolean: true },
];

const Number_Data: number[] = [40, 60, 60, 20, 80, 40, 100, 60];

// Generate mock data (for testing purposes, if needed)
const String_Data = (): DataItem[] => [
  { category: "Food" },
  { category: "Khmer" },
  { category: "Khmer" },
  { category: "Khmer" },
  { category: "Khmer" },
  { category: "Khmer" },
  { category: "Food" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Japanese" },
  { category: "Japanese" },
  { category: "Mexican" },
  { category: "Mexican" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Japanese" },
  { category: "Japanese" },
  { category: "Mexican" },
  { category: "Mexican" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Japanese" },
  { category: "Japanese" },
  { category: "Mexican" },
  { category: "Mexican" },
  { category: "Thai" },
  { category: "Thai" },
  { category: "Thai" },
];

// for month data
const Line_Data = [
  { month: "Jan", Food: 10, Khmer: 15, Thai: 20, Japanese: 5, Mexican: 3 },
  { month: "Feb", Food: 20, Khmer: 10, Thai: 15, Japanese: 8, Mexican: 6 },
  { month: "Mar", Food: 15, Khmer: 20, Thai: 25, Japanese: 10, Mexican: 7 },
  { month: "Apr", Food: 25, Khmer: 15, Thai: 20, Japanese: 12, Mexican: 50 },
  { month: "May", Food: 20, Khmer: 10, Thai: 30, Japanese: 14, Mexican: 8 },
  { month: "Jun", Food: 30, Khmer: 25, Thai: 35, Japanese: 18, Mexican: 10 },
  { month: "Jul", Food: 35, Khmer: 30, Thai: 40, Japanese: 20, Mexican: 12 },
  { month: "Aug", Food: 40, Khmer: 35, Thai: 45, Japanese: 22, Mexican: 15 },
  { month: "Sep", Food: 45, Khmer: 40, Thai: 50, Japanese: 25, Mexican: 18 },
  { month: "Oct", Food: 50, Khmer: 45, Thai: 55, Japanese: 28, Mexican: 20 },
  { month: "Nov", Food: 55, Khmer: 50, Thai: 60, Japanese: 30, Mexican: 22 },
  { month: "Dec", Food: 60, Khmer: 55, Thai: 65, Japanese: 35, Mexican: 200 },
];

export const Chart = () => {
  return (
    <div>
      <div className="flex bg-gray-300 flex-row justify-between space-x-[2px]">
        <Category data={String_Data()} />
        <BooleanChart data={Boolean_Data} />
        <Number data={Number_Data} />
        <Number data={Number_Data} />
        <Number data={Number_Data} />
      </div>
      <div className="bg-blue-300 flex flex-row p-5 space-x-5">
        {/* Pie Chart */}
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
          <PieChart data={String_Data()} show_category={true} />
        </div>

        {/* Bar Chart */}
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
          <BarChart data={String_Data()} show_category={true} />
        </div>

        {/* Line Chart */}
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
          <LineChart data={Line_Data} show_category={true} />
        </div>
      </div>
    </div>
  );
};
