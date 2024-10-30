//? **************************************************
//* **************************************************
//? **************************************************

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

import { Category } from "@/src/components/Chart_UI/Catagory";
import { Number } from "@/src/components/Chart_UI/Number";
import { PieChart } from "@/src/components/Chart_UI/PieChart";
import { BarChart } from "@/src/components/Chart_UI/BarChart";
import { LineChart } from "@/src/components/Chart_UI/LineChart";

export const Chart = () => {
  return (
    <div>
      <div className="flex bg-gray-300 flex-row justify-between space-x-[2px]">
        <Category />
        <Number />
        <Number />
        <Number />
        <Number />
        <Number />
      </div>
      <div className="bg-blue-300 flex flex-row p-5 space-x-5">
        {/* Pie Chart */}
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
          <PieChart />
        </div>

        {/* Bar Chart */}
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Bar Chart</h2>
          <BarChart />
        </div>

        {/* Line Chart */}
        <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
          <LineChart />
        </div>
      </div>
    </div>
  );
};
