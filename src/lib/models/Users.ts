import mongoose from "mongoose";

type UserType = {
  id: string;
  email: string;
  name: string;
  educationLevel: "high-school" | "undergradStudent" | "mastersStudent" | "other";
  age: number;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema<UserType>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
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
      required: true,
      enum: ["high-school", "undergradStudent", "mastersStudent", "other"],
      default: "undergradStudent",
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.models.User || mongoose.model<UserType>("User", UserSchema);