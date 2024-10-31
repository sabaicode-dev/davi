import React from "react";
import { BarChart } from "../molecules/charts/BarChart";
import CleaningPage from "../VisualizeComponents/CleaningPage";

export default function Visualize() {
  return (
    <div className="h-screen flex justify-center items-center">
      <CleaningPage/>
    </div>
  );
}
