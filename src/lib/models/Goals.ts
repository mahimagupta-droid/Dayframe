import mongoose from "mongoose";

export type GoalsTypes = {
  _id?: string;
  clerkId: string; 
  title: string;
  description: string;
  dueDate: Date;
  category: "side-hustle" | "home" | "personal" | "school";
  progress: number;
  status: "todo" | "in-progress" | "completed";
  milestones: Array<{
    title: string;
    completed?: boolean;
    completedAt?: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
};

const GoalsSchema = new mongoose.Schema<GoalsTypes>(
  {
    clerkId: { type: String, required: true, index: true }, // Ties to the user
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    category: {
      type: String,
      enum: ["side-hustle", "home", "personal", "school"],
      default: "school",
    },
    // Progress can be a virtual or a pre-save hook calculation
    progress: { type: Number, default: 0, min: 0, max: 100 },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    milestones: [
      {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        completedAt: { type: Date },
      },
    ],
  },
  { timestamps: true },
);

export const Goals =
  mongoose.models.Goals || mongoose.model<GoalsTypes>("Goals", GoalsSchema);
