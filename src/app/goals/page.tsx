/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GoalsTypes } from "@/lib/models/Goals";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Goals() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<GoalsTypes>>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true);
            const response = await fetch("/api/goals",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if(response.ok){
                toast.success("Goal added successfully!");
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-4 mt-4">
            <div className="text-3xl mb-3 font-lexend">Enter Goals</div>
            <form
                className="border rounded p-6 space-y-4 w-full max-w-lg bg-zinc-900"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center justify-between">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="text-black text-[13px] p-0.5 rounded bg-white w-56"
                        placeholder="eg. complete assignments"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div className="flex justify-between">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        className="rounded min-h-20 text-black w-56 text-[13px] p-1"
                        placeholder="physics, maths"
                        required
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        className="text-black text-[13px] p-0.5 rounded bg-white w-56"
                        required
                        value={formData?.dueDate instanceof Date ? formData.dueDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value) })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        id="category"
                        className="text-black text-[13px] p-0.5 rounded bg-white w-56"
                        required
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as "side-hustle" | "home" | "personal" | "school" })}
                    >
                        <option value="">Choose one</option>
                        <option value="side-hustle">Side Hustle</option>
                        <option value="home">Home</option>
                        <option value="personal">Personal</option>
                        <option value="school">School</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="progress">Progress</label>
                    <input
                        type="number"
                        name="progress"
                        id="progress"
                        min="0"
                        max="100"
                        className="text-black text-[13px] p-0.5 rounded bg-white w-56"
                        required
                        value={formData.progress}
                        onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <label htmlFor="status">Status</label>
                    <select
                        name="status"
                        id="status"
                        className="text-black text-[13px] p-0.5 rounded bg-white w-56"
                        required
                        value={formData.status || ''}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as "started" | "not-started" | "completed" })}
                    >
                        <option value="">Choose one</option>
                        <option value="todo">Todo</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="pt-4 border-t">
                    <div className="mb-4 text-lg font-semibold">Add Milestones</div>
                    <div className="space-y-3 p-4 rounded">
                        <div className="flex items-center justify-between">
                            <label htmlFor="milestoneTitle">Title</label>
                            <input
                                type="text"
                                id="milestoneTitle"
                                name="milestoneTitle"
                                className="text-black text-[13px] p-0.5 rounded bg-white w-56"
                                placeholder="eg. complete assignments"
                                value={formData.milestones?.[0]?.title || ''}
                                onChange={(e) => {
                                    const updatedMilestone = formData.milestones ? [...formData.milestones] : [];
                                    updatedMilestone[0] = {
                                        ...updatedMilestone[0],
                                        title: e.target.value,
                                    };
                                    setFormData({ ...formData, milestones: updatedMilestone });
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label>Completed?</label>
                            <div className="flex gap-6 w-56 justify-center">
                                <label className="flex items-center text-sm cursor-pointer text-white">
                                    <input
                                        type="radio"
                                        name="milestoneCompleted"
                                        className="mr-2 w-4 h-4"
                                        checked={formData.milestones?.[0]?.completed === true}
                                        onChange={() => {
                                            const updatedMilestones = formData.milestones ? [...formData.milestones] : [];
                                            updatedMilestones[0] = { ...updatedMilestones[0], completed: true };
                                            setFormData({ ...formData, milestones: updatedMilestones });
                                        }}
                                    />
                                    Yes
                                </label>
                                <label className="flex items-center text-white text-sm cursor-pointer">
                                    <input
                                        type="radio"
                                        name="milestoneCompleted"
                                        className="mr-2 w-4 h-4"
                                        checked={formData.milestones?.[0]?.completed === false}
                                        onChange={() => {
                                            const updatedMilestones = formData.milestones ? [...formData.milestones] : [];
                                            updatedMilestones[0] = { ...updatedMilestones[0], completed: false };
                                            setFormData({ ...formData, milestones: updatedMilestones });
                                        }}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="completedAt" className="mr-4">Completed At</label>
                            <input
                                type="date"
                                id="completedAt"
                                name="completedAt"
                                className="text-black text-[13px] p-0.5 rounded bg-white w-56"
                                value={
                                    formData.milestones?.[0]?.completedAt instanceof Date
                                        ? formData.milestones[0].completedAt.toISOString().split('T')[0]
                                        : ''
                                }
                                onChange={(e) => {
                                    const updatedMilestone = formData.milestones ? [...formData.milestones] : [];
                                    updatedMilestone[0] = {
                                        ...updatedMilestone[0],
                                        completedAt: new Date(e.target.value),
                                    };
                                    setFormData({ ...formData, milestones: updatedMilestone });
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-4">
                    {loading ? (
                        <button className="bg-red-700 cursor-not-allowed opacity-80 p-2 rounded" disabled>
                            Adding Task...
                        </button>
                    ) : (
                        <button className="bg-red-600 hover:bg-green-600 transition p-2 rounded px-8" type="submit">
                            Add Task
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}