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
  const location = useLocation();
  const scrapedData = location.state?.scrapedData.filename; // Retrieve scraped data
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleItemClick = useCallback((index: number) => {
    setSelectedItemId(index); // Update the selected item ID
  }, []);
  console.log("Table:::::::::::::", selectedItemId);

  const [selectedCheckedFiles, setSelectedCheckedFiles] = useState<number[]>(
    []
  ); // Store selected file indices as an array
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
  console.log("AcceptFile::::::::::::::", selectedCheckedFiles);

  const { projectId } = useParams();
  const handleLoad = async () => {
    const confirmFileNames = selectedCheckedFiles ?? [];
    const rejectFilenames = scrapedData.filter(
      (filename: any) => !confirmFileNames.includes(filename) // Check if filename is NOT in confirmFileNames
    );

    try {
      // if (response) {
      //   console.log("File confirm successfully");
      // }
      const response = await request({
        url: `${API_ENDPOINTS.API_URL}/project/${projectId}/scrape/confirm-dataset/`,
        method: "POST",
        data: {
          confirmed_filename: confirmFileNames,
          rejected_filename: rejectFilenames,
        },
      });
      console.log("confirmFile::::::::::::", confirmFileNames);
      console.log("Attempting to navigate");
      navigate(`/project/${projectId}/`);
      console.log("Navigation successful");
      console.log(response);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  // Modal state management
  const [showModal, setShowModal] = useState(false);

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
