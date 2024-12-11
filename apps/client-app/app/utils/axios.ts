import dotenv from "dotenv";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

dotenv.config();

// Extend AxiosRequestConfig to include `_retry` flag
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface FailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: CustomAxiosRequestConfig; // Use CustomAxiosRequestConfig instead
}

// Flag to track token refresh
let isTokenRefreshing = false;
let failedRequestsQueue: FailedRequests[] = [];

async function refreshToken(): Promise<{
  accessToken: string;
  idToken: string;
}> {
  try {
    const response = await axios.post(
      // `${"http://localhost:4001"}/v1/auth/refresh-token`,
      `${process.env.NEXT_PUBLIC_AUTH_ENDPOINT}/refresh-token`,
      null,
      {
        withCredentials: true,
      }
    );
    const { accessToken, idToken } = extractTokensFromResponse(response);
    return { accessToken, idToken };
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}

function extractTokensFromResponse(response: AxiosResponse): {
  accessToken: string;
  idToken: string;
} {
  let accessToken = "";
  let idToken = "";

  const setCookieHeaders = response.headers["set-cookie"];
  if (setCookieHeaders) {
    setCookieHeaders.forEach((cookie) => {
      const [cookieName, cookieValue] = cookie.split(";")[0].split("=");
      if (cookieName === "access_token") {
        accessToken = cookieValue;
      } else if (cookieName === "id_token") {
        idToken = cookieValue;
      }
    });
  }

  return { accessToken, idToken };
}

const axiosInstance = axios.create({
  // baseURL: "http://localhost:4001",
  baseURL: process.env.NEXT_PUBLIC_AUTH_ENDPOINT,
  withCredentials: true,
});

// Add an interceptor to handle 401 errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error: unknown) {
    const axiosError = error as AxiosError;
    const originalRequest = axiosError.config as
      | CustomAxiosRequestConfig
      | undefined; // Ensure proper type

    if (
      axiosError.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isTokenRefreshing) {
        // Queue the request while token is refreshing
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedRequestsQueue.push({
            resolve,
            reject,
            config: originalRequest,
          });
        });
      }

      originalRequest._retry = true;
      isTokenRefreshing = true;

      try {
        const { accessToken } = await refreshToken();

        // Set the access token in axios defaults for subsequent requests
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // Retry all failed requests with the new access token
        failedRequestsQueue.forEach(({ resolve, reject, config }) => {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${accessToken}`,
          };
          axiosInstance(config).then(resolve).catch(reject);
        });

        // Clear the queue
        failedRequestsQueue = [];

        // Retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (err) {
        // Reject all queued requests if token refresh fails
        failedRequestsQueue.forEach(({ reject }) => reject(err as AxiosError));
        failedRequestsQueue = [];
        throw err;
      } finally {
        isTokenRefreshing = false;
      }
    }

    // Reject the error if it’s not 401 or retry failed
    return Promise.reject(error);
  }
);

export default axiosInstance;
