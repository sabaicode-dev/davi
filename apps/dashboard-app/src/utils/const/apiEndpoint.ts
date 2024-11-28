// src/utils/const/api-endpoints.ts
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const API_ENDPOINTS = {
  SIGN_UP: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/signup`,
  VERIFY: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/confirm`,
  SIGN_IN: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/signin`,
  SIGN_OUT: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/lognout`,
  SIGN_IN_WITH_GOOGLE: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/google`,
  REFRESH_TOKEN: `${process.env.REACT_APP_API_URL_AUTH_ENDPOINT}/refresh-token`,
  USER_PROFILE: `${process.env.REACT_APP_API_URL_USER_ENDPOINT}/me`,
  UPDATE_USER_NAME: `${process.env.REACT_APP_API_URL_USER_ENDPOINT}/updateUsername`,
};

// Print to see if variables are loaded
console.log("API_ENDPOINTS:", API_ENDPOINTS);
