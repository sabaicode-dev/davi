import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mySQLImage from "@/public/images/my-svg/mysql-official.svg";
import LoadingButton from "../../atoms/LoadingButton";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
import ErrorPopup from "../forms/popupError";
import PasswordInput from "../forms/PasswordInput";
import TextInput from "../forms/TextInput";

export const MySQLConnection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [host, setHost] = useState("localhost");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [tableNames, setTableNames] = useState<string[]>([]);
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

    if (!host || !user || !database || tableNames.length === 0) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      host,
      user,
      password,
      database,
      table_names: tableNames,
    };

    const endpoint = `${API_ENDPOINTS.BEST_URL}/load_MySQL/api/v1/load/mySQl_data/`;

    try {
      setLoading(true);
      setError("");
      setResponse(null);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Failed to connect to the backend.");
      }

      const data = await res.json();
      console.log(data);

      setResponse(data);

      // Check for errors in the response
      const errors = Object.entries(data.data || {})
        .filter(([_, value]) => (value as any).error)
        .map(([key, value]) => `${key}: ${(value as any).error}`);

      if (errors.length > 0) {
        setShowPopup({ visible: true, errors });
        return;
      }

      // Navigate to the next page if fetch success
      navigate(`/project/${projectId}/pick-datasource/query/confirmFiles`, {
        state: { scrapedData: data },
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handlePopupConfirm = () => {
    setShowPopup({ visible: false, errors: [] });
    navigate(`/project/${projectId}/pick-datasource/query/confirmFiles`, {
      state: { scrapedData: response },
    });
  };

  const handlePopupCancel = () => {
    setShowPopup({ visible: false, errors: [] });
  };

  const handleBack = () => {
    navigate(`/project/create/pick-datasource?projectId=${projectId}`);
  };

  return (
    <div className="flex flex-col w-full items-center p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Connect to MySQL</h1>
      <div className="w-full max-w-5xl p-10 flex flex-col md:flex-row gap-8 border border-blue-200 rounded-lg bg-white shadow-lg">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="h-[90%] w-full mb-6 flex items-center justify-center">
            <img
              src={mySQLImage}
              alt="MySQL Connection"
              className="w-[250px] object-cover mx-auto"
            />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            <span className="text-blue-700">My</span>
            <span className="text-yellow-600">SQL</span>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between min-h-full">
              <div>
                <TextInput
                  id="host"
                  label="Host"
                  value={host}
                  onChange={setHost}
                  placeholder="e.g., localhost"
                  required
                />
                <TextInput
                  id="user"
                  label="User"
                  value={user}
                  onChange={setUser}
                  placeholder="e.g., root"
                  required
                />
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  label="Password (Optional)"
                  placeholder="Enter your password"
                />
                <TextInput
                  id="database"
                  label="Database Name"
                  value={database}
                  onChange={setDatabase}
                  placeholder="Enter the database name"
                  required
                />
                <TextInput
                  id="tableNames"
                  label="Table Names (comma-separated)"
                  value={tableNames.join(", ")}
                  onChange={(value) =>
                    setTableNames(value.split(",").map((name) => name.trim()))
                  }
                  placeholder="e.g., db_coffee, food"
                  required
                />
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
                  className="my-custom-class" // Optional
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
