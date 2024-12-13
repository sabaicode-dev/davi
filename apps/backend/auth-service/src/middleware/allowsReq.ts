import cors from "cors";

// Determine allowed origins based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://d3llp4uth9m31o.cloudfront.net",
        "https://dgm6c7j4yhtsc.cloudfront.net",
      ]
    : ["http://localhost:3000", "http://localhost:8080"];

// Export the CORS middleware configuration
export const corsOptions = cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});

// Export allowedOrigins for logging or debugging purposes if needed
export { allowedOrigins };
