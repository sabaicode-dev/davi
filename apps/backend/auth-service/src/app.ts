console.log("app.ts is running...!");
console.log("update on 09/Dec/2024, 04:02 PM");

console.log(`------ At : @SabaiCode ------`);

import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes/v1/routes";
import fs from "fs";
import path from "path";
import { allowedOrigins, corsOptions } from "@/src/middleware/allowsReq";
import { errorHandler } from "@/src/middleware/errorHandler";
import cookieParser from "cookie-parser";
import chalk from "chalk";
import bodyParser from "body-parser";

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

// ========================
// Parse JSON data in requests
// ========================
app.use(bodyParser.json());

// =======================
// Security Middlewares
// =======================
app.use(cookieParser());

// Configure CORS to allow requests from localhost:3000
// Apply CORS configuration
app.use(corsOptions);

//log show allowedOrigins
console.log(chalk.blue("==== allowedOrigins ====="));

console.log(`allowedOrigins : ${allowedOrigins}`);

// ========================
// Global API V1
// ========================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use(
  "/api-docs",
  swaggerUi.serve as any,
  swaggerUi.setup(swaggerDocument) as any
);
// ========================
// ERROR Handler
// ========================
app.use(errorHandler);

console.log(
  chalk.green(`Server initialized on ${new Date().toLocaleString()}`)
);

export default app;
