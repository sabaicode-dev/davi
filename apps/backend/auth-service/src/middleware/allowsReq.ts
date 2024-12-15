import cors from "cors";

// Determine allowed origins based on environment
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://d3llp4uth9m31o.cloudfront.net", // login-app
        "https://dgm6c7j4yhtsc.cloudfront.net", // redirect-to-dashboardApp
      ]
    : [
        "http://localhost:3000",
        "http://localhost:8080",
        "http://127.0.0.1:5500",
      ];

// Export the CORS middleware configuration
export const corsOptions = cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});

// Export allowedOrigins for logging or debugging purposes if needed
export { allowedOrigins };
