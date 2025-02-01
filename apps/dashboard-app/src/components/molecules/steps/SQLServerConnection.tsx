import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SQLServerImage from "@/public/images/my-svg/microsoft-sql-server-logo.svg";
import LoadingButton from "../../atoms/LoadingButton";
import ErrorPopup from "../forms/popupError"; // Import the ErrorPopup component
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
import CodeMirror from "@uiw/react-codemirror"; // Use default export
import { sql } from "@codemirror/lang-sql";
import PasswordInput from "../forms/PasswordInput";
import TextInput from "../forms/TextInput";

export const SQLServerConnection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [server, setServer] = useState("localhost");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [tableNames, setTableNames] = useState<string[]>([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sqlQuery, setSqlQuery] = useState(""); // State for custom SQL query
  const [showPopup, setShowPopup] = useState<{
    visible: boolean;
    errors: string[];
  }>({
    visible: false,
    errors: [],
  });

  const navigate = useNavigate();

  const validateInput = (): boolean => {
    const errors: string[] = [];
    if (!server.trim()) errors.push("Server is required.");
    if (!username.trim()) errors.push("Username is required.");
    if (!database.trim()) errors.push("Database name is required.");

    // Ensure either sql_query or table_name is provided, but not both
    if (!sqlQuery.trim() && tableNames.length === 0) {
      errors.push("Either a custom SQL query or table names must be provided.");
    } else if (sqlQuery.trim() && tableNames.length > 0) {
      errors.push(
        "Provide either a custom SQL query or table names, not both."
      );
    }

    // Check for empty table names if tableNames are used
    if (tableNames.length > 0 && tableNames.some((name) => !name.trim())) {
      errors.push("Table names cannot contain empty values.");
    }

    if (errors.length > 0) {
      setShowPopup({ visible: true, errors });
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput()) return;

    const payload: Record<string, any> = {
      server,
      database,
      username,
      password,
    };

    if (sqlQuery.trim()) {
      payload.sql_query = sqlQuery.trim();
    } else if (tableNames.length > 0) {
      payload.table_name = tableNames;
    }

    const endpoint = `${API_ENDPOINTS.BEST_URL}/api/v1/datasets/load-sql-server/`;

    try {
      setLoading(true);
      setShowPopup({ visible: false, errors: [] }); // Reset popup
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
      navigate(`/projects/${projectId}/data-sources/sql-server/confirm-files`, {
        state: { scrapedData: data },
      });
    } catch (err: any) {
      setShowPopup({
        visible: true,
        errors: [err.message || "An unexpected error occurred."],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/projects/${projectId}/data-sources`);
  };

  const handlePopupConfirm = () => {
    setShowPopup({ visible: false, errors: [] });
    if (response) {
      navigate(`/projects/${projectId}/data-sources/sql-server/confirm-files`, {
        state: { scrapedData: response },
      });
    }
  };

  const handlePopupCancel = () => {
    setShowPopup({ visible: false, errors: [] });
  };

  return (
    <div className="flex flex-col w-full p-5 items-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Connect to SQL Server</h1>
      <div className="w-full max-w-5xl p-10 flex flex-col md:flex-row gap-8 border border-blue-200 rounded-lg shadow-lg">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="h-[90%] w-full mb-6 flex items-center justify-center">
            <img
              src={SQLServerImage}
              alt="SQL Server Connection"
              className="w-[250px] object-cover mx-auto"
            />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            <span className="text-blue-700">SQL</span>
            <span className="text-yellow-600">Server</span>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between min-h-full">
              <div>
                <TextInput
                  id="server"
                  label="Server"
                  value={server}
                  onChange={setServer}
                  placeholder="e.g., localhost"
                  required
                />
                <TextInput
                  id="username"
                  label="Username"
                  value={username}
                  onChange={setUsername}
                  placeholder="e.g., SA"
                  required
                />
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  label="Password"
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
                  placeholder="e.g., Employees, Products"
                />
                <div className="mb-3">
                  <label
                    htmlFor="sqlQuery"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Custom SQL Query
                  </label>
                  <CodeMirror
                    value={sqlQuery}
                    extensions={[sql()]}
                    onChange={(value) => setSqlQuery(value)}
                    className="mt-2 border border-gray-400 shadow-sm"
                    placeholder="Write your custom SQL query here"
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
