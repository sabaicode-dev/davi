import DetailVisualize from "../molecules/visualize/DetailVisualize";
import VisualizeCreated from "../molecules/visualize/Visualize";
import ShowResuleCleaning from "../project/ShowResultCleaning";
import DataFlow from "../templates/DataFlow";


export default function Project() {
  return (
    <div className="h-auto flex justify-center items-center">
      {/* <ShowResuleCleaning /> */}
      {/* <VisualizeCreated/> */}
      {/* <DetailVisualize/> */}
      <DataFlow/>
    </div>
  );
}
