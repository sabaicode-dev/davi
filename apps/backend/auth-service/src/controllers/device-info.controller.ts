import {
  Controller,
  Get,
  Post,
  Request,
  Route,
  Tags,
  Response,
  Body,
  Query,
} from "tsoa";
import {
  getCheckInfo,
  // getCheckInfo,
  getDeviceInfo,
  getLocation,
} from "../services/device-info.service";
import { DeviceInfo } from "./types/DeviceInfo.type";
import { LocationUser } from "./types/locationUser.type";

@Route("/v1/auth")
@Tags("Check Device Login Info")
export class DeviceInfoController extends Controller {
  /**
   * Fetches device information for the incoming request.
   * @param request Express Request object containing headers and metadata.
   * @returns A promise that resolves to a `DeviceInfo` object with device and location details.
   */
  @Get("/device-info")
  public async getDeviceInfo(@Request() request: any): Promise<DeviceInfo> {
    try {
      return await getDeviceInfo(request);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unknown error occurred while fetching device information.";
      this.setStatus(500); // Set HTTP status code to 500
      throw new Error(errorMessage);
    }
  }

  @Post("/api/send-location")
  @Response(200, "Location received successfully", {
    email: "email user's location",
    lat: "latitude of the location",
    lng: "longitude of the location",
    googleMapsLink: "link to Google Maps with the coordinates",
  })
  @Response(400, "Bad Request", {
    error: "Latitude and Longitude are required.",
  })
  @Response(500, "Internal Server Error", { error: "Something went wrong." })
  public async sendLocation(
    @Body() body: { lat: number; lng: number; email: string },
    @Request() request: any
  ) {
    try {
      const dev_info = await getDeviceInfo(request);

      console.log(`dev_info :::: ${dev_info}`);

      const { lat, lng, email } = body;

      // Validate required fields
      if (!lat || !lng || !email) {
        this.setStatus(400);
        return { error: "Latitude, Longitude, and email are required." };
      }

      // Fetch processed location data and save to database
      const locationData = await getLocation(lat, lng, email, true, dev_info);

      // Return success response
      return {
        message: "Location received and saved successfully.",
        location: locationData,
        dev_info,
      };
    } catch (error: any) {
      console.error("Error in sendLocation:", error);
      this.setStatus(500);
      return {
        error: "An error occurred while processing the location.",
        message: error.message || "Unknown error",
      };
    }
  }

  // read data from email of user
  @Get("/getCheckInfo")
  public async getCheckInfo(@Query() email: string): Promise<LocationUser> {
    try {
      if (!email) {
        throw new Error("Email is required.");
      }

      const location = await getCheckInfo(email);

      if (!location) {
        throw new Error("No location found for the provided email.");
      }

      return location; // Return the location if found
    } catch (error: any) {
      console.error("Error in getCheckInfo:", error.message);
      throw new Error(
        error.message || "An error occurred while fetching location data."
      );
    }
  }
}
