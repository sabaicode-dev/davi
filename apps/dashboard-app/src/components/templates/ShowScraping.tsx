import { useState, useCallback } from "react";
import DisplayTable from "./DisplayTable";
import ShowTable from "./ShowTable";
import Button from "../atoms/Button";
import { useParams } from "react-router-dom";
import request from "@/src/utils/helper";
import { useLocation, useNavigate } from "react-router-dom";
import LoadModal from "../molecules/modals/LoadModal";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";

const ShowScraping = () => {
  const { projectId } = useParams();
  const location = useLocation();
  const scrapedData = location.state?.scrapedData.filename; // Retrieve scraped data
  const navigate = useNavigate();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedCheckedFiles, setSelectedCheckedFiles] = useState<number[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);


  const handleItemClick = useCallback((index: number) => {
    setSelectedItemId(index);
  }, []);

  const handleCheckClick = useCallback((index: number) => {
    setSelectedCheckedFiles((prevSelected) => {
      if (prevSelected.includes(index)) {
        // If the item is already selected, remove it from the array
        return prevSelected.filter((id) => id !== index);
      } else {
        // If the item is not selected, add it to the array
        return [...prevSelected, index];
      }
    });
  }, []);

  const handleLoad = async () => {
    const confirmFileNames = selectedCheckedFiles ?? [];
    const rejectFilenames = scrapedData.filter(
      (filename: any) => !confirmFileNames.includes(filename) // Check if filename is NOT in confirmFileNames
    );

    try {
      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/projects/${projectId}/scrape/confirm-dataset/`,
        method: "POST",
        data: {
          confirmed_filename: confirmFileNames,
          rejected_filename: rejectFilenames,
        },
      });

      navigate(`/projects/${projectId}/`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  const handleConfirm = () => {
    setShowModal(false); // Close modal
    handleLoad(); // Proceed with loading
  };

  const handleCancel = () => {
    setShowModal(false); // Close modal without doing anything
  };

  return (
    <>
      <div className="flex flex-col py-5 space-y-5">
        {/* Pass handleItemClick to DisplayTable */}
        <div className="flex">
          <DisplayTable
            handleItemClicked={handleItemClick}
            selectedItemId={selectedItemId}
            handleCheckClicked={handleCheckClick}
            selectedCheckedFiles={selectedCheckedFiles} // Pass the array of selected files
          />

          {/* Pass selectedItemId to ShowTable */}
          <ShowTable selectedItemId={selectedItemId} />
        </div>
        <div className="flex items-end justify-end">
          <Button
            children={"Load"}
            size="medium"
            radius="2xl"
            isLoading={false}
            color="primary"
            className=" border-blue-500 w-20"
            onClick={() => setShowModal(true)} // Show modal on button click
          />
        </div>
      </div>
      {/* LoadModal component */}
      <LoadModal
        isOpen={showModal} // Modal visibility controlled by state
        onClose={handleCancel} // Handle cancel action
        onConfirm={handleConfirm} // Handle confirm action
      />
    </>
  );
};

export default ShowScraping;
