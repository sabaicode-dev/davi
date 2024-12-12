import { Controller, Get, Request, Route, Tags } from "tsoa";
import { getDeviceInfo } from "../services/device-info.service";
import { DeviceInfo } from "./types/DeviceInfo.type";

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
}
