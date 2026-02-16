"use client";
import { GoalsTypes } from "@/lib/models/Goals";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Goals() {
    const [formData, setFormData] = useState<Partial<GoalsTypes>>({
        milestones: [
            {
                title: "",
                completed: false,
                completedAt: undefined,
            },
        ],
    });
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("/api/goals", {
                method: "P8OST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success && data.goal) {
                setFormData({
                    milestones: [
                        {
                            title: "",
                            completed: false,
                            completedAt: undefined,
                        },
                    ],
                });
                toast.success("Goal created successfully");
            } else {
                toast.error(data.error || "Failed to create goal");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen w-full overflow-hidden gap-14 ml-4">
            <section className="w-1/2 p-2 h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                <div className="flex flex-col items-center justify-center w-[75%] border rounded bg-neutral-900">
                    goals fetched data
                </div>
            </section>
            <section className="w-1/2 p-2 h-[80vh] mr-4 flex justify-center">
                <div className="w-[75%] border rounded flex flex-col bg-neutral-900">
                    <form className="rounded p-2 flex flex-col items-center overflow-y-auto h-full" onSubmit={handleSubmit}>
                        <div className="text-2xl underline">Fill the Goals here!</div>
                        <div>
                            <div className="p-3">
                                <label
                                    htmlFor="title"
                                    className="mr-12"
                                >
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title || ""}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label
                                    htmlFor="description"
                                    className="mr-12"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description || ""}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="rounded min-h-6 text-black w-36 text-[13px]"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label
                                    htmlFor="dueDate"
                                    className="mr-12"
                                >
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    value={
                                        formData.dueDate
                                            ? formData.dueDate instanceof Date && !isNaN(formData.dueDate.getTime())
                                                ? formData.dueDate.toISOString().split("T")[0]
                                                : ""
                                            : ""
                                    }
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value ? new Date(e.target.value) : undefined })}
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="category" className="mr-5">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category || ""}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "side-hustle" | "home" | "personal" | "school" })}
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                                    required
                                >
                                    <option value="" disabled>Choose one</option>
                                    <option value="side-hustle">side-hustle</option>
                                    <option value="home">home</option>
                                    <option value="personal">personal</option>
                                    <option value="school">school</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <label className="mr-5 font-medium">Progress (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    name="progress"
                                    value={formData.progress || 0}
                                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                                    className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                                    placeholder="0 - 100"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="status" className="mr-5">Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    value={formData.status || ""}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "todo" | "in-progress" | "completed" })}
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                                    required
                                >
                                    <option value="" disabled>Choose one</option>
                                    <option value="todo">todo</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <p className="font-medium mb-2">Create Milestone</p>

                                {formData.milestones?.map((milestone, index) => (
                                    <div key={index} className="border p-3 rounded space-y-3">
                                        <div>
                                            <label className="mr-3">Title</label>
                                            <input
                                                type="text"
                                                value={milestone.title}
                                                onChange={(e) => {
                                                    const updatedMilestones = [...(formData.milestones || [])];
                                                    updatedMilestones[index].title = e.target.value;
                                                    setFormData({ ...formData, milestones: updatedMilestones });
                                                }}
                                                className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <label>Completed?</label>
                                            <label className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`milestoneCompleted-${index}`}
                                                    value="yes"
                                                    checked={milestone.completed === true}
                                                    onChange={() => {
                                                        const updatedMilestones = [...(formData.milestones || [])];
                                                        updatedMilestones[index].completed = true;
                                                        setFormData({ ...formData, milestones: updatedMilestones });
                                                    }}

                                                />
                                                Yes
                                            </label>
                                            <label className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`milestoneCompleted-${index}`}
                                                    value="no"
                                                    checked={milestone.completed === false}
                                                    onChange={() => {
                                                        const updatedMilestones = [...(formData.milestones || [])];
                                                        updatedMilestones[index].completed = false;
                                                        setFormData({ ...formData, milestones: updatedMilestones });
                                                    }}
                                                />
                                                No
                                            </label>
                                        </div>
                                        <div>
                                            <label className="mr-3">Completed At</label>
                                            <input
                                                type="date"
                                                value={
                                                    milestone.completedAt
                                                        ? milestone.completedAt instanceof Date &&
                                                            !isNaN(milestone.completedAt.getTime())
                                                            ? milestone.completedAt.toISOString().split("T")[0]
                                                            : ""
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    const updatedMilestones = [...(formData.milestones || [])];
                                                    updatedMilestones[index].completedAt = e.target.value
                                                        ? new Date(e.target.value)
                                                        : undefined;
                                                    setFormData({ ...formData, milestones: updatedMilestones });
                                                }}
                                                className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <button className="bg-red-600 p-2 rounded" type="submit">Create Goal</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}