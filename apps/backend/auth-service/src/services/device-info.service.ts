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

    // let my_pub_ip = "::ffff:102.211.232.255";

    let my_pub_ip =
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

    console.log("**********************");
    console.log(`my_pub_ip  :::: ${my_pub_ip}`);
    console.log("**********************");

    // If the IP address is in IPv6-mapped IPv4 format, extract the actual IPv4 address
    if (my_pub_ip.startsWith("::ffff:")) {
      my_pub_ip = my_pub_ip.slice(7); // Remove the "::ffff:" prefix to get the actual IPv4 address
    }

    const locationApiResponse = await axios.get(
      `https://ipapi.co/${my_pub_ip}/json/`
    );

    let location: any = {
      region: locationApiResponse.data.region || "Unknown",
      capital: locationApiResponse.data.country_capital || "Unknown",
      country: locationApiResponse.data.country_name || "Unknown",
    };

    if (my_pub_ip && my_pub_ip !== "::1" && my_pub_ip !== "127.0.0.1") {
      location;
      console.log(`location ::::> ${location}`);
    } else {
      location = "Localhost";
    }

    const latitude = locationApiResponse.data.latitude || "Unknown";
    const longitude = locationApiResponse.data.longitude || "Unknown";

    let googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    if (latitude === "Unknown" && longitude === "Unknown") {
      googleMapsLink = "Unknown";
    }

    let get_network_org = locationApiResponse.data.org || "Unknown";

    return {
      my_os,
      my_pub_ip,
      os,
      browser,
      userAgent: userAgentString || "No User-Agent provided",
      currentDateTime,
      location,
      deviceDetails,
      googleMapsLink,
      get_network_org,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error while fetching device information.";
    throw new Error(`Failed to fetch device information: ${errorMessage}`);
  }
};
