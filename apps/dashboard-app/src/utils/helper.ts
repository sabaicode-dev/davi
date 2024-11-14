import axios, { AxiosResponse, AxiosError } from "axios";
import { RequestParams } from "./types/helper.type";

const base_url = "";

interface ApiResponse {
  data: any;
  status: number;
  success: boolean;
  message?: string;
}

const request = async ({
  url = "",
  method = "GET",
  data = {},
}: RequestParams): Promise<ApiResponse> => {
  try {
    // Determine Content-Type based on data type
    const headers: Record<string, string> = {
      "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
    };

    // Make the API request
    const response: AxiosResponse = await axios({
      url: base_url + url,
      method: method,
      data: data,
      headers: headers,
      withCredentials: true,
    });

    // Return success response
    return {
      data: response.data,
      status: response.status,
      success: true,
      message: "Request successful",
    };
  } catch (error) {
    console.error("Request error:", error);

    // Extract error information
    const axiosError = error as AxiosError;
    const errorData = (axiosError.response?.data || {}) as { message?: string };
    const errorMessage = errorData.message || axiosError.message || "An error occurred";

    return {
      data: errorData,
      status: axiosError.response?.status || 500,
      success: false,
      message: errorMessage,
    };
  }
};

export default request;