import axios from "axios";
import { DeviceInfo } from "../controllers/types/DeviceInfo.type";
import DeviceDetector from "device-detector-js"; // Import device-detector-js
import Location from "@/src/database/models/location.models"; // Import the Location model

const detector = new DeviceDetector();

export const getDeviceInfo = async (request: any): Promise<DeviceInfo> => {
  try {
    const show_all = request.headers;

    // Safely extract the value from the header
    const my_os_with_quotes = show_all["sec-ch-ua-platform"];
    const my_os = my_os_with_quotes
      ? my_os_with_quotes.replace(/"/g, "")
      : "Unknown";

    // let my_pub_ip = "::ffff:209.146.61.157";

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

    console.log(
      `getDeviceInfo --> latitude :: ${latitude} and longitude :: ${longitude}`
    );

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

export const getLocation = async (
  lat: number,
  lng: number,
  email: string,
  saveToDatabase = false,
  device_info: DeviceInfo
) => {
  try {
    if (!lat || !lng || !email) {
      throw new Error("Latitude, Longitude, and email are required.");
    }

    console.log(
      `Processing location: Latitude=${lat}, Longitude=${lng}, Email=${email}`
    );

    const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;

    const locationData = {
      email,
      lat,
      lng,
      googleMapsLink,
      dev_info: device_info, // Ensure the object matches the schema
    };

    if (saveToDatabase) {
      const existingLocation = await Location.findOne({ email });
      if (existingLocation) {
        console.log("Existing location found:", existingLocation);
        await Location.deleteOne({ email });
        console.log(`Deleted existing record for email: ${email}`);
      }

      const locationRecord = new Location(locationData);
      const savedLocation = await locationRecord.save();
      console.log("Saved new location:", savedLocation);
    }

    return locationData;
  } catch (error: any) {
    console.error("Error in getLocation:", error);
    throw new Error(
      error.message || "An error occurred while processing the location."
    );
  }
};

export const getCheckInfo = async (email: string) => {
  try {
    if (!email) {
      throw new Error("Email is required.");
    }

    const userLocation = await Location.findOne({ email });

    console.log(`userLocation ::: ${userLocation}`);

    return userLocation;
  } catch (error: any) {
    console.error("Error in getCheckInfo:", error);
    throw new Error(
      error.message || "An error occurred while checking location data."
    );
  }
};
