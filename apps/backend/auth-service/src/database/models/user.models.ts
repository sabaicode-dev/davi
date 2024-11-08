// src/models/user.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// Define the User schema
export interface IUser extends Document {
  username: string;
  email: string;
  password?: string; // Optional if not storing locally
  cognitoUserId?: string;
  confirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    cognitoUserId: { type: String, unique: true },
    confirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
