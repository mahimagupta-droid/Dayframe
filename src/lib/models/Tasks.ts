import mongoose from "mongoose";

export type TasksTypes = {
  clerkId: string;
  goalId?: mongoose.Types.ObjectId;
  title: string;
  deadline: Date;
  priority: "high" | "medium" | "low";
  difficulty: "hard" | "medium" | "easy";
  timeRequired: "long" | "medium" | "short";
  description: string;
  category: "side-hustle" | "home" | "personal" | "school";
  status: "todo" | "in-progress" | "completed";
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
};

const TasksSchema = new mongoose.Schema<TasksTypes>(
  {
    clerkId: { type: String, required: true, index: true },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goals",
      nullable: true,
    },
    title: { type: String, required: true },
    deadline: { type: Date, required: true },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    difficulty: {
      type: String,
      enum: ["hard", "medium", "easy"],
      default: "medium",
    },
    timeRequired: {
      type: String,
      enum: ["long", "medium", "short"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo",
    },
    completedAt: { type: Date },
  },
  { timestamps: true },
);

export const Tasks =
  mongoose.models.Tasks || mongoose.model<TasksTypes>("Tasks", TasksSchema);
