import { DeviceInfo } from "./DeviceInfo.type";

export interface LocationUser {
  email: string;
  lat: number;
  lng: number;
  googleMapsLink: string;
  dev_info: DeviceInfo;
  createdAt: Date;
}
