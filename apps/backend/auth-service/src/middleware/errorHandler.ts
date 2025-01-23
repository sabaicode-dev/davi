import { Request, Response, NextFunction } from "express";

// Define an error type with a status property
interface CustomError extends Error {
  status?: number;
}

// Error-handling middleware function
export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error stack:", err); // Log the stack trace for debugging purposes

  // Set the status code to the error's status or default to 500 for internal errors
  const statusCode = err.status || 500;
  const errorMessage = err.message || "An internal server error occurred";

  // Send the error response to the client
  res.status(statusCode).json({
    error: errorMessage,
  });
};
