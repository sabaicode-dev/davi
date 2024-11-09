import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/v1/routes";
import fs from "fs";
import path from "path";
import cors from "cors";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// ========================
// Initialize App Express
// ========================
const app = express();

// ========================
// Global Middleware
// ========================
app.use(express.json()); // Help to get the json from request body

// Configure CORS to allow requests from localhost:3000
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://d3llp4uth9m31o.cloudfront.net"]
    : ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    // origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

//log show allowedOrigins 
console.log(`allowedOrigins : ${allowedOrigins}`);

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// ERROR Handler
// ========================

export default app;
