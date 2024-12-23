import React, { useState } from "react";
import axios from "axios";

// Define the expected response structure
interface MetadataColumn {
  type: string;
  key: string;
  name: string;
  description: string;
  table_column_info: {
    order: number;
    original_type: string;
    type: string;
    extended_type: string;
  };
  table_column_metrics: {
    total_count: number;
    non_null_count: number;
    valid_count: number;
    string_metrics: {
      most_common_value: string;
      most_common_value_count: number;
      counts: Array<{ key: string; value: number }>;
      unique_value_count: number;
    };
  };
}

const FileUploadAndMetadata: React.FC = () => {
  const [file, setFile] = useState<File | null>(null); // File state
  const [metadata, setMetadata] = useState<MetadataColumn[]>([]); // Metadata response
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setFile(uploadedFile);
    setError(null);
    setMetadata([]); // Reset previous metadata
  };

  // Handle file upload and metadata fetch
  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      setLoading(true);
      setError(null);

      // Send the file to the API endpoint
      const response = await axios.post<MetadataColumn[]>(
        "http://3.24.110.41:8000/metafile/upload/", // Replace with your actual API endpoint
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMetadata(response.data); // Set metadata response
    } catch (err) {
      console.error("Error uploading file:", err);
      setError("Failed to upload file or fetch metadata. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload a File to Fetch Metadata</h1>

      {/* File Input */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Metadata Table */}
      {metadata.length > 0 && (
        <table border={1} cellPadding={8} cellSpacing={0}>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Most Common Value</th>
              <th>Unique Value Count</th>
              <th>Top 3 Counts</th>
            </tr>
          </thead>
          <tbody>
            {metadata.map((column) => (
              <tr key={column.key}>
                <td>{column.name}</td>
                <td>{column.table_column_metrics.string_metrics.most_common_value}</td>
                <td>{column.table_column_metrics.string_metrics.unique_value_count}</td>
                <td>
                  {column.table_column_metrics.string_metrics.counts
                    .slice(0, 3) // Top 3 values
                    .map((item, index) => (
                      <div key={index}>
                        {item.key}: {item.value}
                      </div>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FileUploadAndMetadata;
