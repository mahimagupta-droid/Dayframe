import mongoose from "mongoose";

export type UserType = {
  clerkId: string;
  email: string;
  name: string;
  educationLevel: "high-school" | "bachelors" | "masters";
  age: number;
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
    name: {
      type: String,
      required: true,
    },
    educationLevel: {
      type: String,
      enum: ["high-school", "bachelors", "masters"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);
