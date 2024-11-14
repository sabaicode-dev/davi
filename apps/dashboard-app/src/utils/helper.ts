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
    const headers: Record<string, string> = {
      "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
    };

    const response: AxiosResponse = await axios({
      url: base_url + url,
      method: method,
      data: data,
      headers: headers,
      withCredentials: true,
    });
    return {
      data: response.data,
      status: response.status,
      success: response.status >= 200 && response.status < 300,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default request;