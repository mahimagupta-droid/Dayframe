import mongoose from "mongoose"

type TasksTypes = {
    id: string,
    title: string,
    deadline: Date,
    priority: "Important" | "Can be kept for later" | "Moderately Important",
    difficulty: "very" | "manageable" | "easy",
    timeRequired: "lengthy, requires a lot of time" | "slightly lengthy, can be managed within a moderate span" | "short, can be done within a short span",
    description: string,
    category: "side-hustle" | "home" | "personal" | "school",
    status: "to-do" | "in progress" | "completed",
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
        enum: ["Important", "Can be kept for later", "Moderately Important"],
        type: String,
        default: "Important"
    },
    difficulty: {
        enum: ["very", "manageable", "easy"],
        type: String,
        default: "manageable"
    },
    timeRequired: {
        enum: ["lengthy, requires a lot of time", "slightly lengthy, can be managed within a moderate span", "short, can be done within a short span"],
        type: String,
        default: "slightly lengthy, can be managed within a moderate span"
    },
    status: {
        enum: ["to-do", "in progress", "completed"],
        default: "to-do",
        type: String
    }
},
    {
        timestamps: true
    }
)

export const Tasks = mongoose.models.Tasks || mongoose.model<TasksTypes>("Tasks", TasksSchema);