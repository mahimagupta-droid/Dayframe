import mongoose from "mongoose"

type GoalsTypes = {
    id: string,
    title: string,
    desciption: string,
    dueDate: Date,
    category: "side-hustle" | "home" | "personal" | "school",
    progress: number,
    status: "started" | "not-started" | "completed",
    milestones: Array<{
        title: string,
        completed: boolean,
        completedAt: Date
    }>
    createdAt: Date,
    updatedAt: Date
}


const GoalsSchema = new mongoose.Schema<GoalsTypes>({
    id: {
        unique: true,
        required: true,
        type: String
    },
    title: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
    desciption: {
        type: String,
        required: true
    },
    category: {
        enum: ["side-hustle", "home", "personal", "school"],
        type: String,
        default: "school"
    },
    progress: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["started", "not-started", "completed"],
        default: "not-started"
    },
    milestones: [
        {
            title: String,
            completed: {
                type: Boolean,
                default: false
            },
            completedAt: Date
        }
    ]
}, {
    timestamps: true
})

export const Goals = mongoose.models.Goals || mongoose.model<GoalsTypes>("Goals", GoalsSchema);