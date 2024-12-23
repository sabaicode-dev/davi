import { DeviceInfo } from "@/src/controllers/types/DeviceInfo.type";
import mongoose, { Schema, Document } from "mongoose";

export interface ILocation extends Document {
  email: string;
  lat: number;
  lng: number;
  googleMapsLink: string;
  dev_info: DeviceInfo;
  createdAt: Date;
}

const DeviceInfoSchema = new Schema<DeviceInfo>({
  my_os: { type: String, required: true },
  my_pub_ip: { type: String, required: true },
  os: { type: String, required: true },
  browser: { type: String, required: true },
  userAgent: { type: String, required: true },
  currentDateTime: { type: String, required: true },
  location: {
    region: { type: String, required: false },
    capital: { type: String, required: false },
    country: { type: String, required: false },
  },
  deviceDetails: { type: Object, required: true },
  googleMapsLink: { type: String, required: true },
  get_network_org: { type: String, required: true },
});

export const LocationSchema = new Schema<ILocation>({
  email: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  googleMapsLink: { type: String, required: true },
  dev_info: { type: DeviceInfoSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Location = mongoose.model<ILocation>("Location", LocationSchema);

export default Location;
