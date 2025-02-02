import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MariaDBImage from "@/public/images/my-svg/mariadb.svg";
import LoadingButton from "../../atoms/LoadingButton";
import ErrorPopup from "../forms/popupError";
import { API_ENDPOINTS } from "@/src/utils/const/apiEndpoint";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import PasswordInput from "../forms/PasswordInput";
import TextInput from "../forms/TextInput";

export const MariaDBConnection = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [formData, setFormData] = useState({
    server: "localhost",
    username: "",
    password: "",
    database: "",
    tableNames: "",
    sqlQuery: "",
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
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
    const { server, username, database, sqlQuery, tableNames } = formData;

    if (!server.trim()) errors.push("Server is required.");
    if (!username.trim()) errors.push("Username is required.");
    if (!database.trim()) errors.push("Database name is required.");

    const hasSqlQuery = sqlQuery.trim().length > 0;
    const hasTableNames = tableNames.trim().length > 0;

    if (!hasSqlQuery && !hasTableNames) {
      errors.push("Either a custom SQL query or table names must be provided.");
    } else if (hasSqlQuery && hasTableNames) {
      errors.push(
        "Provide either a custom SQL query or table names, not both."
      );
    }

    if (hasTableNames && tableNames.split(",").some((name) => !name.trim())) {
      errors.push("Table names cannot contain empty values.");
    }

    if (errors.length > 0) {
      setShowPopup({ visible: true, errors });
      return false;
    }
    return true;
  };

  const handleInputChange = (
    key: keyof typeof formData,
    value: string
  ): void => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput()) return;

    const { server, username, password, database, tableNames, sqlQuery } =
      formData;

    const payload: Record<string, any> = {
      host: server,
      user: username,
      password,
      database,
    };

    if (sqlQuery.trim()) {
      payload.query = sqlQuery.trim();
    } else if (tableNames.trim()) {
      payload.table_names = tableNames.split(",").map((name) => name.trim());
    }

    const endpoint = `${API_ENDPOINTS.BEST_URL}/api/v1/datasets/load-mariadb/`

    try {
      setLoading(true);
      setShowPopup({ visible: false, errors: [] });
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

      const errors = Object.entries(data.data || {})
        .filter(([_, value]) => (value as any).error)
        .map(([key, value]) => `${key}: ${(value as any).error
          }`);

      if (errors.length > 0) {
        setShowPopup({ visible: true, errors });
        return;
      }

      navigate(`/projects/${projectId}/data-sources/maria-db/confirm-files`, {
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
      navigate(`/projects/${projectId}/data-sources/maria-db/confirm-files`, {
        state: { scrapedData: response },
      });
    }
  };

  const handlePopupCancel = () => {
    setShowPopup({ visible: false, errors: [] });
  };

  return (
    <div className="flex flex-col w-full items-center p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Connect to MariaDB</h1>
      <div className="w-full max-w-5xl p-10 flex flex-col md:flex-row gap-8 border border-blue-200 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <div className="h-[90%] w-full mb-6 flex items-center justify-center">
            <img
              src={MariaDBImage}
              alt="MariaDB Connection"
              className="w-[250px] object-cover mx-auto"
            />
          </div>
          <div className="text-3xl font-bold text-gray-800">
            <span className="text-blue-700">Maria</span>
            <span className="text-yellow-600">DB</span>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <TextInput
                id="server"
                label="Server"
                value={formData.server}
                onChange={(value) => handleInputChange("server", value)}
                placeholder="e.g., localhost"
                required
              />
              <TextInput
                id="username"
                label="Username"
                value={formData.username}
                onChange={(value) => handleInputChange("username", value)}
                placeholder="e.g., root"
                required
              />
              <PasswordInput
                value={formData.password}
                onChange={(value) => handleInputChange("password", value)}
                label="Password"
                placeholder="Enter your password"
              />
              <TextInput
                id="database"
                label="Database Name"
                value={formData.database}
                onChange={(value) => handleInputChange("database", value)}
                placeholder="Enter the database name"
                required
              />
              <TextInput
                id="tableNames"
                label="Table Names (comma-separated)"
                value={formData.tableNames}
                onChange={(value) => handleInputChange("tableNames", value)}
                placeholder="e.g., employees, products"
              />
              <div>
                <label
                  htmlFor="sqlQuery"
                  className="block text-sm font-medium text-gray-700"
                >
                  Custom SQL Query
                </label>
                <CodeMirror
                  value={formData.sqlQuery}
                  extensions={[sql()]}
                  onChange={(value) => handleInputChange("sqlQuery", value)}
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
              />
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
