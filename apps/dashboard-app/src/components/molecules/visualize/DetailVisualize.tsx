import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@/src/components/atoms/Button";
import VisualizeImageIcon from "@/public/images/visualize_image_in_detail_vis.png";
import { FaEllipsis } from "react-icons/fa6";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
import { format, isToday, isThisWeek } from "date-fns";

const DetailVisualize: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [visualization, setVisualization] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleMenu, setVisibleMenu] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisualizationDetails = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINTS.API_URL}/visualizations/${location.state.viz.id}/`
        );
        if (response.status === 200) {
          setVisualization(response.data);
        }
      } catch (error) {
        console.error("Error fetching visualization details:", error);
      } finally {
        setIsLoading(false); // Stop showing skeleton loader
      }
    };

    if (location.state?.viz?.id) {
      fetchVisualizationDetails();
    }
  }, [location.state?.viz?.id]);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (isToday(parsedDate)) {
      return format(parsedDate, "'Today at' p"); // e.g., "Today at 2:30 PM"
    }

    if (isThisWeek(parsedDate, { weekStartsOn: 1 })) {
      return format(parsedDate, "'Last' EEEE 'at' p"); // e.g., "Last Tuesday at 2:30 PM"
    }

    return format(parsedDate, "PPP 'at' p"); // e.g., "Jan 7, 2025 at 2:30 PM"
  };

  const handleDeleteChart = async (chartId: string) => {
    if (!visualization) return;

    try {
      // Check the number of remaining charts
      if (visualization.charts.length === 1) {
        // If only one chart remains, delete the entire visualization
        const response = await axios.delete(
          `${API_ENDPOINTS.API_URL}/visualizations/${visualization.id}/`
        );

        if (response.status === 200 || response.status === 204) {
          console.log("Visualization deleted successfully.");
          navigate(-1); // Navigate back after deleting the entire visualization
        }
      } else {
        // If multiple charts remain, delete the specific chart
        const response = await axios.delete(
          `${API_ENDPOINTS.API_URL}/visualizations/${visualization.id}/charts/${chartId}/delete/`
        );

        if (response.status === 200 || response.status === 204) {
          console.log("Chart deleted successfully.");

          // Update the local state to remove the deleted chart
          setVisualization((prev: any) => ({
            ...prev,
            charts: prev.charts.filter((chart: any) => chart.id !== chartId),
          }));
        }
      }
    } catch (error) {
      console.error("Error deleting chart:", error);
    }
  };

  const toggleMenu = (index: number) => {
    setVisibleMenu((prevIndex) => (prevIndex === index ? null : index)); // Toggle visibility
  };

  if (isLoading) {
    return (
      <div className="w-full">
        {/* Skeleton for header */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center space-x-4">
            <Skeleton width={56} height={56} circle />
            <div className="flex flex-col">
              <Skeleton width={200} height={20} />
              <Skeleton width={150} height={15} className="mt-2" />
            </div>
          </div>
          <Skeleton width={100} height={40} />
        </div>
        <div className="border-t-2 border-[#443DFF] my-4" />
        {/* Skeleton for charts */}
        <div className="grid grid-cols-3 w-full justify-around items-center space-x-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-slate-100 rounded-xl border-[1px] border-gray-300 duration-150 shadow-lg"
            >
              <div className="p-4">
                <Skeleton width="60%" height={20} />
                <Skeleton width="80%" height={300} className="mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
              {formatDate(visualization.created_at)}
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
                        onClick={() => handleDeleteChart(chart.id)}
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
                  src={chart.chart_image}
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
                <p className="text-gray-500">
                  {new Date(visualization.created_at).toLocaleString()}
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
