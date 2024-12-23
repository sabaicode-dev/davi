import mongoose, { Schema, Document, Model } from "mongoose";

// Define the Admin schema
export interface IAdmin extends Document {
  username: string;
  email: string;
  password?: string; // Optional if not storing locally
  role: string; // Adding a role field for the admin
  profile?: string;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastConfirmationSentAt?: number;
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, required: true, default: "admin" }, // Default role as admin
    profile: { type: String },
    confirmed: { type: Boolean, default: false },
    lastConfirmationSentAt: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
