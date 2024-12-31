import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingButton from "../../atoms/LoadingButton";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
import { FaExclamationTriangle } from "react-icons/fa"; // Import a warning icon from react-icons
import SuccessPopup from "../forms/SuccessPopup";

interface ScrapedData {
  [key: string]: string | { error: string }; // Adjusted the type to handle both strings and objects with errors
}

export const ConfirmFiles = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [confirmedFiles, setConfirmedFiles] = useState<string[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    console.log("Fetched Data:", state?.scrapedData);
  }, [state]);

  const handleConfirm = (filename: string) => {
    setConfirmedFiles((prev) => {
      if (prev.includes(filename)) {
        return prev.filter((file) => file !== filename); // Toggle off
      }
      return [...prev, filename]; // Toggle on
    });
    setRejectedFiles((prev) => prev.filter((file) => file !== filename)); // Remove from rejected
  };

  const handleSubmit = async () => {
    if (confirmedFiles.length === 0) {
      setError("Please confirm at least one file.");
      return;
    }
    try {
      setLoading(true);
      setError("");

      // Get all filenames
      const allFilenames = Object.entries(state?.scrapedData?.data || {}).map(
        ([key, value]) => (typeof value === "string" ? value : key)
      );

      // Mark all unconfirmed files as rejected
      const allRejectedFiles = allFilenames.filter(
        (filename) => !confirmedFiles.includes(filename)
      );
      setRejectedFiles(allRejectedFiles);

      const payload = {
        confirmed_filename: confirmedFiles,
        rejected_filename: allRejectedFiles,
      };

      const endpoint = `${API_ENDPOINTS.BEST_URL}/readData_MongoDB/api/v1/project/${projectId}/comfirmData/mongo_data/`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Failed to submit data.");
      }

      setShowSuccessPopup(true); // Show success popup
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const scrapedData: ScrapedData = state?.scrapedData?.data || {};
  const scrapedFiles = Object.entries(scrapedData);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content Area */}
      <div className="flex flex-grow h-full">
        <aside className="w-[20%] bg-gray-100 border-r border-gray-300 p-4">
          <h2 className="text-lg font-semibold mb-4">File List</h2>
          <ul className="space-y-2">
            {scrapedFiles.map(([key, value], index) => {
              const filename = typeof value === "string" ? value : key;
              const error = typeof value === "object" && value.error;
              return (
                <li key={index}>
                  <label className="flex items-center gap-2 bg-white p-2 px-4 border rounded-lg hover:shadow-md">
                    <input
                      type="checkbox"
                      checked={confirmedFiles.includes(filename)}
                      onChange={() => handleConfirm(filename)}
                    />
                    <span className="truncate flex items-center gap-2">
                      {key} {/* Display the key name here */}
                      {error && (
                        <>
                          <FaExclamationTriangle className="text-red-500" />
                          <span className="text-red-500">(Error)</span>
                        </>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-blue-50">
          <div className="flex items-center h-[60px]">
            <h2 className="text-lg font-semibold mx-6">Selected Files</h2>
          </div>
          {scrapedFiles
            .filter(([key, value]) => {
              const filename = typeof value === "string" ? value : key;
              return (
                confirmedFiles.includes(filename) ||
                rejectedFiles.includes(filename)
              );
            })
            .map(([key, value], index) => {
              const filename = typeof value === "string" ? value : key;
              const error = typeof value === "object" && value.error;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between bg-white border rounded-lg mx-6 p-4 mb-2 hover:shadow-lg ${
                    error ? "border-red-500" : "border-blue-500"
                  }`}
                >
                  <div className="truncate max-w-[70%] flex flex-col">
                    {/* Display full name here */}
                    <span>{filename}</span>
                    {error && (
                      <span className="text-red-500 flex items-center gap-2">
                        <FaExclamationTriangle className="text-red-500" />
                        (Error: {error})
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      className={`py-1 px-3 rounded ${
                        error
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : confirmedFiles.includes(filename)
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => handleConfirm(filename)}
                      disabled={!!error} // Disable if there's an error
                    >
                      {confirmedFiles.includes(filename)
                        ? "Unselect"
                        : "Select"}
                    </button>
                  </div>
                </div>
              );
            })}
          {/* <p>scrapedFiles: {JSON.stringify(scrapedFiles, null, 2)}</p> */}
        </main>
      </div>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 left-0 right-0 p-4 bg-gray-100 border-t border-gray-300 shadow-md">
        <div className="flex justify-end">
          <LoadingButton
            loading={loading}
            label="Submit"
            loadingLabel="Submitting..."
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:shadow-md"
          />
        </div>
      </footer>
      {/* popup Success */}
      {showSuccessPopup && (
        <SuccessPopup
          message="Files successfully confirmed!"
          navigateTo={`/project/${projectId}`}
        />
      )}
    </div>
  );
};
