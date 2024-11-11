// src/utils/const/api-endpoints.ts
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const API_ENDPOINTS = {
  SIGN_UP: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signup`,
  VERIFY: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/confirm`,
  SIGN_IN: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/signin`,
  SIGN_OUT: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/lognout`,
  SIGN_IN_WITH_GOOGLE: `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/google`,
  USER_PROFILE: `${process.env.NEXT_PUBLIC_USER_ENDPOINT}/me`,
};

// Print to see if variables are loaded
console.log("API_ENDPOINTS:", API_ENDPOINTS);
