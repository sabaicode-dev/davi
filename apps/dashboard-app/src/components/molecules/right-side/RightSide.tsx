import React from "react";
import PieChart from '@/public/images/right-side-icons/pie_chart.png'
import BarChart from '@/public/images/right-side-icons/bar_chart.png'
import LineChart from '@/public/images/right-side-icons/line_chart.png'


const RightSide: React.FC = () => {
  return (
    <>
      <div className="flex flex-col  bg-red-200 w-[400px] h-full">
        <div>
          <h1 className="text-[16px] font-bold">Recommend Chart </h1>
        </div>
        <div className="flex justify-around">
          <div>
            <h1>Text</h1>
            <img src="" alt="" />
          </div>
          <div>
            <h1>Text</h1>
            <img src="" alt="" />
          </div>
          <div>
            <h1>Text</h1>
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSide;
