import axios from "axios";
import { DeviceInfo } from "../controllers/types/DeviceInfo.type";
import DeviceDetector from "device-detector-js"; // Import device-detector-js

const detector = new DeviceDetector();

export const getDeviceInfo = async (request: any): Promise<DeviceInfo> => {
  try {
    const show_all = request.headers;

    // Safely extract the value from the header
    const my_os_with_quotes = show_all["sec-ch-ua-platform"];
    const my_os = my_os_with_quotes
      ? my_os_with_quotes.replace(/"/g, "")
      : "Unknown";

    const ip =
      request.headers["cf-connecting-ip"] ||
      request.headers["x-real-ip"] ||
      (request.headers["x-forwarded-for"]
        ? (request.headers["x-forwarded-for"] as string).split(",")[0]
        : "") ||
      request.socket.remoteAddress ||
      "";

    const userAgentString = request.headers["user-agent"];
    if (!userAgentString) {
      throw new Error("User-Agent header is missing.");
    }

    const result = detector.parse(userAgentString); // Use device-detector-js's parse method
    const deviceDetails = result;

    console.log("Request deviceDetails ::::::", deviceDetails);

    const os = result.os?.name || "Unknown";
    const browser = result.client?.name || "Unknown";

    const currentDateTime = new Date().toLocaleString();

    let location = "Unknown";
    if (ip && ip !== "::1" && ip !== "127.0.0.1") {
      const locationApiResponse = await axios.get(
        `https://ipapi.co/${ip}/json/`
      );
      location = `${locationApiResponse.data.city}, ${locationApiResponse.data.region}, ${locationApiResponse.data.country_name}`;
    } else {
      location = "Localhost";
    }

    return {
      my_os,
      ip,
      os,
      browser,
      userAgent: userAgentString || "No User-Agent provided",
      currentDateTime,
      location,
      deviceDetails,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error while fetching device information.";
    throw new Error(`Failed to fetch device information: ${errorMessage}`);
  }
};
