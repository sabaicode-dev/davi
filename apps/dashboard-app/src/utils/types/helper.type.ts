type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

// Define props, It describe the params
export interface RequestParams {
  url: string;
  method: HTTPMethod;
  data?: Record<string, any>;
}
