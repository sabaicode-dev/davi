import axios, { AxiosResponse } from "axios";
import { RequestParams } from "./types/helper.type";

const base_url = "";

interface ApiResponse {
  data: any;
  status: number;
  success?: boolean;
}

const request = async ({
  url = "",
  method = "GET",
  data = {},
}: RequestParams): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios({
      url: base_url + url,
      method: method,
      data: data,
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      withCredentials: true,
    });
    return {
      data: data.data,
      status: response.status,
      success: response.status >= 200 && response.status < 300,
    };
  } catch (error) {
    console.log("This error block");
    console.error(error);
    throw error; // Rethrow the error to be caught in the calling code
  } finally {
    console.log("call finally");
  }
};

export default request;
