import { useState, useCallback } from "react";
import DisplayTable from "./DisplayTable";
import ShowTable from "./ShowTable";
import Button from "../atoms/Button";
import { useNavigate, useParams } from "react-router-dom";

const ShowScraping = () => {
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Use useCallback to memorize the callback and prevent unnecessary re-renders
  const handleItemClick = useCallback((index: number) => {
    setSelectedItemId(index); // Update the selected item ID
  }, []);
  const handleChangeIndex = (value: number) => {
    setSelectedIndex(value);
  };

  const navigate = useNavigate();
  const { projectId, fileId } = useParams();

  const handleNextClick = () => {
    try {
      console.log("Attempting to navigate");
      navigate(`/project/${projectId}/file/${fileId}/cleaning`);
      // navigate(`/project/${projectId}/create/pick-datasource`);
      console.log("Navigation successful");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col py-5 space-y-5">
        {/* Pass handleItemClick to DisplayTable */}
        <div className="flex">
          <DisplayTable
            handleItemClicked={handleItemClick}
            selectedItemId={selectedItemId}
            handleChangeIndex={handleChangeIndex}
          />

          {/* Pass selectedItemId to ShowTable */}
          <ShowTable
            selectedItemId={selectedItemId}
            selectedIndex={selectedIndex}
          />
        </div>
        <div className="flex items-end justify-end">
          <Button
            children={"Next"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="primary"
            className=" border-blue-500 w-20"
            onClick={handleNextClick}
          />
        </div>
      </div>
    </>
  );
};

export default ShowScraping;
