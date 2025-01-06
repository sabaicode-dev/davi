// import React, { useState, useEffect } from "react";
// import Card from "./Card";

// interface CardContainerProps {
//   numCards: number;
// }

// interface CardData {
//   id: number;
// }
// //http://127.0.0.1:8000/api/v1/projects/67638bb114458b3e2a225664/files/
// const CardContainer: React.FC<CardContainerProps> = ({ numCards }) => {
//   const [cards, setCards] = useState<CardData[]>([]);

//   // Initialize the cards based on the numCards prop
//   useEffect(() => {
//     const initialCards = Array.from({ length: numCards }, (_, i) => ({
//       id: i + 1,
//     }));
//     setCards(initialCards);
//   }, [numCards]);

//   const deleteCard = (index: number) => {
//     setCards((prevCards) => prevCards.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="space-y-5 w-full">
//       {cards.map((card, index) => (
//         <Card key={card.id} index={index} onDelete={() => deleteCard(index)} />
//       ))}
//     </div>
//   );
// };

// export default CardContainer;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom"; // Import useParams for dynamic URL handling

// interface FileData {
//   _id: string;
//   project_id: string;
//   filename: string;
//   file: string;
//   size: number;
//   type: string;
//   created_at: string;
//   uuid: string;
//   is_original: boolean;
//   is_deleted: boolean;
//   is_sample: boolean;
//   original_file: string | null;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: FileData[];
// }

// const FileCard = () => {
//   const { projectId } = useParams<{ projectId: string }>(); // Get projectId from the URL
//   const [files, setFiles] = useState<FileData[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       // if (!projectId) {
//       //   setError("Project ID is missing from the URL.");
//       //   setIsLoading(false);
//       //   return;
//       // }

//       try {
//         const response = await axios.get<ApiResponse>(
//           `http://127.0.0.1:8000/api/v1/projects/${projectId}/files/`
//         );

//         if (response.data.success && response.data.data) {
//           const filteredFiles = response.data.data.filter((file) => file.is_sample);
//           console.log("Filtered files (is_sample):", filteredFiles);
//           setFiles(filteredFiles);
//         } else {
//           throw new Error(response.data.message || "Failed to fetch files");
//         }
//       } catch (err) {
//         console.error("Error fetching files:", err);
//         setError(err instanceof Error ? err.message : "Unknown error occurred");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFiles();
//   }, [projectId]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Files</h1>
//       <ul>
//         {files.map((file) => (
//           <li key={file._id}>
//             <strong>Filename:</strong> {file.filename} <br />
//             <strong>Type:</strong> {file.type} <br />
//             <strong>Size:</strong> {file.size} bytes <br />
//             <strong>Created At:</strong> {file.created_at} <br />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FileCard;
