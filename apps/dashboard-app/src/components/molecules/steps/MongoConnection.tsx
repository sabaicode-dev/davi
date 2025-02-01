import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mongoImage from "@/public/images/my-svg/mongodb-icon-1.svg";
import LoadingButton from "../../atoms/LoadingButton";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
import ErrorPopup from "../forms/popupError";
import TextInput from "../forms/TextInput";

export const MongoConnection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [uri, setUri] = useState("");
  const [database, setDatabase] = useState("");
  const [collections, setCollections] = useState<string[]>([]);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState<{
    visible: boolean;
    errors: string[];
  }>({
    visible: false,
    errors: [],
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uri.trim()) {
      setError("MongoDB URI is required.");
      return;
    }

    if (!database.trim()) {
      setError("Database name is required.");
      return;
    }

    const mongoConnectionEndpoint = `${API_ENDPOINTS.BEST_URL}/api/v1/datasets/load-mongodb/`;

    try {
      setLoading(true);
      setError("");
      setResponse(null);

      const body = {
        uri: uri.trim(),
        database: database.trim(),
        collection: collections.length > 0 ? collections : undefined,
      };

      const res = await fetch(mongoConnectionEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorMessage = await res
          .json()
          .catch(() => "Unexpected error occurred");
        setError(errorMessage.error || "Failed to connect to the backend.");
        return;
      }

      const data = await res.json();

      setResponse(data);

      // Explicitly define the structure of 'data.data'
      type DataItem = {
        error?: string;
        filename?: string;
      };

      const errors = Object.entries(
        (data.data as Record<string, DataItem>) || {}
      )
        .filter(([_, value]) => value.error)
        .map(([key, value]) => `${key}: ${value.error}`);

      if (errors.length > 0) {
        setShowPopup({ visible: true, errors });
        return;
      }

      // Navigate to the next page only if fetch is successful
      if (res.ok) {
        navigate(`/projects/${projectId}/data-sources/mongo-db/confirm-files`, {
          state: { scrapedData: data },
        });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupConfirm = () => {
    setShowPopup({ visible: false, errors: [] });
    navigate(`/project/${projectId}/data-sources/mongo-db/confirm-files`, {
      state: { scrapedData: response },
    });
  };

  const handlePopupCancel = () => {
    setShowPopup({ visible: false, errors: [] });
  };

  const handleBack = () => {
    navigate(`/projects/${projectId}/data-sources`);
  };

  return (
    <div className="flex flex-col w-full items-center p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Connect to MongoDB</h1>
      <div className="w-full max-w-5xl p-10 flex flex-col md:flex-row gap-8 border border-blue-200 rounded-lg bg-white shadow-lg">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="h-[90%] w-full mb-3 flex items-center justify-center">
            <img
              src={mongoImage}
              alt="MongoDB Connection"
              className="w-[250px] h-[250px] object-cover mx-auto"
            />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            <span className="text-green-600">Mongo</span>
            <span className="text-blue-600">DB</span>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between min-h-full">
              <div>
                <div className="mb-3">
                  <TextInput
                    id="uri"
                    label="MongoDB URI"
                    value={uri}
                    onChange={setUri}
                    placeholder="e.g., mongodb+srv://username:password@cluster.mongodb.net"
                    required
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    id="database"
                    label="Database"
                    value={database}
                    onChange={setDatabase}
                    placeholder="Enter the database name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <TextInput
                    id="collections"
                    label="Collections (comma-separated)"
                    value={collections.join(", ")}
                    onChange={(value) =>
                      setCollections(value.split(",").map((col) => col.trim()))
                    }
                    placeholder="e.g., users, admins"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
                >
                  Back
                </button>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  label="Connect"
                  loadingLabel="Connecting..."
                  className="my-custom-class"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* {error && <p className="text-red-500 mt-4">{error}</p>} */}
      {showPopup.visible && (
        <ErrorPopup
          errors={showPopup.errors}
          onConfirm={handlePopupConfirm}
          onCancel={handlePopupCancel}
        />
      )}
    </div>
  );
};
