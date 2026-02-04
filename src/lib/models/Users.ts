import mongoose from "mongoose";

export type UserType = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema<UserType>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);
