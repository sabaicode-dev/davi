import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/src/components/atoms/Button";
import VisualizeImageIcon from "@/public/images/visualize_image_in_detail_vis.png";
import { FaEllipsis } from "react-icons/fa6";

const DetailVisualize: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visualization, setVisualization] = useState<any>(null);
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null);

  useEffect(() => {
    // Load the visualization details passed via state or localStorage
    const savedData = JSON.parse(
      localStorage.getItem("savedVisualizations") || "[]"
    );
    const selectedViz = savedData.find(
      (viz: any) => viz.name === location.state?.viz?.name
    );
    setVisualization(selectedViz);
  }, [location.state?.viz?.name]);

  const handleDeleteChart = (index: number) => {
    if (!visualization) return;

    const updatedCharts = [...visualization.charts];
    updatedCharts.splice(index, 1);

    const updatedVisualizations = JSON.parse(
      localStorage.getItem("savedVisualizations") || "[]"
    ).map((viz: any) =>
      viz.name === visualization.name ? { ...viz, charts: updatedCharts } : viz
    );

    localStorage.setItem(
      "savedVisualizations",
      JSON.stringify(updatedVisualizations)
    );
    setVisualization({ ...visualization, charts: updatedCharts });
  };

  const toggleMenu = (index: number) => {
    setVisibleMenu((prevIndex) => (prevIndex === index ? null : index)); // Toggle visibility
  };

  if (!visualization) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p className="text-gray-500">No visualization found or invalid data.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-center items-center space-x-4">
          <img
            src={VisualizeImageIcon}
            alt="VisualizeImageIcon"
            className="w-14 h-14"
          />
          <div className="flex flex-col">
            <h1 className="text-[16px] font-bold">{visualization.name}</h1>
            <p className="text-sm text-gray-500">
              {new Date(visualization.date).toLocaleString()}
            </p>
          </div>
        </div>
        <div>
          <Button
            children={"Back"}
            size="medium"
            color="outline"
            radius="2xl"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
      <div className="border-t-2 border-[#443DFF] my-4" />
      <div className="grid grid-cols-3 w-full justify-around items-center space-x-6">
        {visualization.charts && visualization.charts.length > 0 ? (
          visualization.charts.map((chart: any, index: number) => (
            <div
              key={index}
              className="bg-slate-100 rounded-xl border-[1px] border-gray-300 duration-150 shadow-lg hover:shadow-xl hover:scale"
            >
              {/* Card Title */}
              <div className="flex justify-between px-4 pt-3 relative">
                <h1 className="text-[16px] font-bold">Visualize Overview</h1>
                <div className="relative">
                  <FaEllipsis
                    onClick={() => toggleMenu(index)}
                    className="text-gray-500 text-2xl cursor-pointer hover:scale-110 transition-all"
                    style={{
                      fontSize: "2.5rem",
                      zIndex: 10,
                      padding: "10px", // Expand clickable area
                    }}
                  />
                  {visibleMenu === index && (
                    <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md p-2">
                      <button
                        onClick={() => handleDeleteChart(index)}
                        className="text-red-500 px-2 py-0 hover:bg-red-50 rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-b-[1px] mt-1 border-gray-400" />
              {/* Card Body */}
              <div className="flex h-[330px] justify-center items-center px-4">
                <img
                  src={chart.chartImage}
                  alt="Visualization"
                  className="w-full h-auto max-h-[400px] object-contain"
                />
              </div>
              {/* Card Footer */}
              <div className="mt-4 px-4 py-2">
                <h2 className="font-bold">Description</h2>
                <p className="text-[12px] text-gray-700">
                  {chart.description || "No description available"}
                </p>
              </div>
              <div className="flex justify-start items-center w-full h-10 rounded-b-xl border-[1px] border-t-gray-300 border-b-none px-4 py-2">
                <p className="text-[12px] text-gray-500">
                  {new Date(chart.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No charts available for this visualization.
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailVisualize;
