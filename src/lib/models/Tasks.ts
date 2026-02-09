import mongoose from "mongoose"

type TasksTypes = {
    id: string,
    title: string,
    deadline: Date,
    priority: "high" | "medium" | "low",
    difficulty: "hard" | "medium" | "easy",
    timeRequired: "long" | "medium" | "short",
    description: string,
    category: "side-hustle" | "home" | "personal" | "school",
    status: "todo" | "in-progress" | "completed",
    createdAt: Date,
    updatedAt: Date,
    completedAt?: Date
}

const TasksSchema = new mongoose.Schema<TasksTypes>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        enum: ["side-hustle", "home", "personal", "school"],
        type: String,
        default: "school"
    },
    priority: {
        enum: ["high", "medium", "low",],
        type: String,
        default: "medium"
    },
    difficulty: {
        enum: ["hard", "medium" , "easy",],
        type: String,
        default: "medium"
    },
    timeRequired: {
        enum: ["long", "medium", "short"],
        type: String,
        default: "medium",
    },
    status: {
        enum: ["todo", "in-progress", "completed"],
        default: "todo",
        type: String
    }
},
    {
        timestamps: true
    }
)

export const Tasks = mongoose.models.Tasks || mongoose.model<TasksTypes>("Tasks", TasksSchema);