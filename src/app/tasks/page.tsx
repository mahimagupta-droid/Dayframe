/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ToolTip from "@/components/tootTip";
import { TasksTypes } from "@/lib/models/Tasks";
import { Check, Plus, Trash, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Tasks() {
    const [hasProfile, setHasProfile] = useState<boolean | null>(null);
    const [submitData, setSubmitData] = useState<Partial<TasksTypes>>({});
    const [taskData, setTaskData] = useState<TasksTypes[] | null>(null);
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Determine if we are updating an existing task or creating a new one
        const isUpdating = !!submitData._id;
        const url = isUpdating ? `/api/tasks/${submitData._id}` : "/api/tasks";
        const method = isUpdating ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                toast.success(isUpdating ? "Task updated!" : "Task created!");
                setSubmitData({});
                setEditing(false);
                await handleFetch();
            } else {
                toast.error("Failed to save task");
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleFetch = async () => {
        try {
            setLoading(true);
            const getResponse = await fetch("/api/tasks", {
                method: "GET",
                headers: { "Content-Type": "application/json" }

            });
            if (getResponse.ok) {
                const responseBody = await getResponse.json();
                setTaskData(responseBody.tasks);
                console.log("success fetching data");
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            setDeleting(true);
            const response = await fetch(`/api/tasks/${id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                toast.success("Task deleted successfully!")
                setSubmitData({});
                setTaskData(null);
                handleFetch();
            } else {
                toast.error("Error deleting task")
            }
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setDeleting(false)
        }
    }

    const checkProfileAndFetchTasks = async () => {
        try {
            const res = await fetch("/api/user");
            const data = await res.json();
            if (data.success) {
                setHasProfile(true);
                await handleFetch();
            } else {
                setHasProfile(false);
            }
        } catch (error) {
            console.error("Failed to check user profile", error);
            setHasProfile(false);
        }
    };

    useEffect(() => {
        checkProfileAndFetchTasks();
    }, [])

    if (hasProfile === null) {
        return <div className="flex h-[84vh] items-center justify-center text-xl">Loading...</div>;
    }

    if (hasProfile === false) {
        return (
            <div className="flex h-[84vh] flex-col items-center justify-center space-y-4">
                <p className="text-2xl font-bold">Please create a user profile first!</p>
                <Link href="/profile-form" className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-neutral-200 transition-colors">
                    Go to Profile Form
                </Link>
            </div>
        );
    }

    if (editing) {
        return (
            <div className="flex items-center justify-center h-screen overflow-hidden mt-10">
                <div className="flex flex-col items-center justify-center w-[75%] p-2 rounded bg-card border">
                    <div className="text-2xl mb-5">Edit task</div>
                    <form
                        onSubmit={handleFormSubmit}
                        className="rounded p-2 space-y-3"
                    >
                        <div className="p-3">
                            <label htmlFor="title" className="mr-12">Title</label>
                            <input
                                type="text"
                                id="edit-title"
                                name="title"
                                required
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="eg. complete assignments"
                                value={submitData?.title}
                                onChange={(e) => setSubmitData({ ...submitData, title: e.target.value })}
                            />
                        </div>
                        <div className="p-3">
                            <label htmlFor="deadline" className="mr-4">Deadline</label>
                            <input
                                type="date"
                                id="edit-deadline"
                                name="deadline"
                                required
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={
                                    submitData?.deadline
                                        ? new Date(submitData.deadline).toISOString().split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    setSubmitData({ ...submitData, deadline: new Date(e.target.value) })
                                }
                            />
                        </div>
                        <div className="p-3">
                            <label htmlFor="priority" className="mr-6">Priority</label>
                            <select
                                name="priority"
                                id="edit-priority"
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={submitData?.priority}
                                onChange={(e) => setSubmitData({ ...submitData, priority: e.target.value as "high" | "medium" | "low" })}
                            >
                                <option value="">Choose one</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="p-3">
                            <label htmlFor="difficulty" className="mr-4">Difficulty</label>
                            <select
                                name="difficulty"
                                id="edit-difficulty"
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={submitData?.difficulty}
                                onChange={(e) => setSubmitData({ ...submitData, difficulty: e.target.value as "hard" | "medium" | "easy" })}
                            >
                                <option value="">Choose one</option>
                                <option value="hard">Hard</option>
                                <option value="medium">Medium</option>
                                <option value="easy">Easy</option>
                            </select>
                        </div>
                        <div className="p-3">
                            <label htmlFor="timeRequired" className="mr-4">Time <br /> Required</label>
                            <select
                                name="timeRequired"
                                id="edit-timeRequired"
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={submitData?.timeRequired}
                                onChange={(e) => setSubmitData({ ...submitData, timeRequired: e.target.value as "long" | "medium" | "short" })}
                            >
                                <option value="">Choose one</option>
                                <option value="long">Long</option>
                                <option value="medium">Medium</option>
                                <option value="short">Short</option>
                            </select>
                        </div>
                        <div className="p-3">
                            <label htmlFor="description" className="mr-4">Description</label>
                            <textarea
                                name="description"
                                id="edit-description"
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="physics, maths"
                                required
                                value={submitData?.description || ""}
                                onChange={(e) => setSubmitData({ ...submitData, description: e.target.value })}
                            />
                        </div>
                        <div className="p-3">
                            <label htmlFor="category" className="mr-5">Category</label>
                            <select
                                name="category"
                                id="edit-category"
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={submitData?.category}
                                onChange={(e) => setSubmitData({ ...submitData, category: e.target.value as "side-hustle" | "home" | "personal" | "school" })}
                            >
                                <option value="">Choose one</option>
                                <option value="side-hustle">Side Hustle</option>
                                <option value="home">Home</option>
                                <option value="personal">Personal</option>
                                <option value="school">School</option>
                            </select>
                        </div>
                        <div className="p-3">
                            <label htmlFor="status" className="mr-10">Status</label>
                            <select
                                name="status"
                                id="edit-status"
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                value={submitData?.status || ''}
                                onChange={(e) => setSubmitData({ ...submitData, status: e.target.value as "todo" | "in-progress" | "completed" })}
                            >
                                <option value="">Choose one</option>
                                <option value="todo">Todo</option>
                                <option value="in-progress">In-Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <ToolTip text="Save">
                                <button
                                    type="submit"
                                    className="bg-accent hover:bg-highlight transition p-2 rounded">
                                    <Check />
                                </button>
                            </ToolTip>
                            <ToolTip text="Cancel">
                                <button
                                    type="button"
                                    className="bg-accent hover:bg-highlight transition p-2 rounded"
                                    onClick={() => setEditing(false)}>
                                    <X />
                                </button>
                            </ToolTip>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div className="space-y-4 mt-20">
            <div className=" flex flex-col items-center justify-center p-2 rounded">
                <p className="text-xl font-bold">
                    Daily actions and to-dos that keep you moving forward. These are the small steps that add up to big wins. What needs to get done today?
                </p>
                <p className="text-end opacity-90">
                    Tasks are specific, actionable items with clear deadlines. Check them off as you complete them!
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start px-4 w-full">
                <section className="w-full lg:w-1/2 flex">
                    <div className="flex flex-col items-center w-full lg:w-[75%] rounded h-[75vh] p-1 border bg-card overflow-y-auto scrollbar-thin">
                        <div className="mt-10">
                            <h2 className="text-xl mb-4">Your Tasks</h2>
                            {taskData?.length === 0 ? (
                                <p>No tasks found</p>
                            ) : (
                                taskData?.map((task, index) => (
                                    <div key={index} className="flex flex-col">
                                        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-4 mb-4       hover:border-gray-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                {task.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 mb-2">
                                                {task.description || "No description provided"}
                                            </p>
                                            <div className="flex items-center justify-between text-sm text-gray-400">
                                                <span>{task.category}</span>
                                                <span>
                                                    {task.deadline
                                                        ? new Date(task.deadline).toLocaleDateString()
                                                        : "No deadline"}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full 
                                                                ${task.status === "completed" ? "bg-green-500/20 text-green-400"
                                                            :
                                                            task.status === "in-progress" ? "bg-blue-500/20 text-blue-400" : "bg-gray-500/20 text-gray-400"
                                                        }`}
                                                >
                                                    {task.status}
                                                </span>
                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full   
                                                        ${task.priority === "high"
                                                            ? "bg-red-500/20 text-red-400"
                                                            : task.priority === "medium"
                                                                ? "bg-yellow-500/20 text-yellow-400"
                                                                : "bg-green-500/20 text-green-400"
                                                        }`}
                                                >
                                                    {task.priority}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row gap-y-1 items-center justify-center gap-4 mt-2">
                                            <ToolTip text="Delete">
                                                {deleting ? <button className="hover:bg-highlight opacity-50 cursor-not-allowed"><Trash /></button> : <button onClick={() => task._id && handleDelete(task._id)} className="bg-accent hover:bg-highlight cursor-pointer text-white rounded p-2"><Trash /></button>}
                                            </ToolTip>
                                            <ToolTip text="Edit">
                                                {editing ? (
                                                    <button className="opacity-50 cursor-not-allowed bg-highlight"><Check /></button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setSubmitData(task);
                                                            setEditing(true);
                                                        }}
                                                        className="bg-accent hover:bg-highlight cursor-pointer text-black rounded p-2"
                                                    >
                                                        <Check />
                                                    </button>
                                                )}
                                            </ToolTip>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div>
                        </div>
                    </div>
                </section>
                <section className="w-full lg:w-1/2 flex justify-center">
                    <div className="flex flex-col items-center justify-center w-full lg:w-[75%] p-1 rounded border bg-card overflow-y-auto scrollbar-thin">
                        <div className="text-2xl mb-5">Fill in the task</div>
                        <form
                            onSubmit={handleFormSubmit}
                            className="rounded p-2"
                        >
                            <div className="p-3">
                                <label htmlFor="title" className="mr-12">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="eg. complete assignments"
                                    value={submitData?.title}
                                    onChange={(e) => setSubmitData({ ...submitData, title: e.target.value })}
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="deadline" className="mr-4">Deadline</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    required
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={
                                        submitData?.deadline
                                            ? new Date(submitData.deadline).toISOString().split("T")[0]
                                            : ""
                                    }
                                    onChange={(e) => setSubmitData({ ...submitData, deadline: new Date(e.target.value) })}
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="priority" className="mr-6">Priority</label>
                                <select
                                    name="priority"
                                    id="priority"
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData?.priority || ""}
                                    onChange={(e) => setSubmitData({ ...submitData, priority: e.target.value as "high" | "medium" | "low" })}
                                >
                                    <option value="">Choose one</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <label htmlFor="difficulty" className="mr-4">Difficulty</label>
                                <select
                                    name="difficulty"
                                    id="difficulty"
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData?.difficulty || ""}
                                    onChange={(e) => setSubmitData({ ...submitData, difficulty: e.target.value as "hard" | "medium" | "easy" })}
                                >
                                    <option value="">Choose one</option>
                                    <option value="hard">Hard</option>
                                    <option value="medium">Medium</option>
                                    <option value="easy">Easy</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <label htmlFor="timeRequired" className="mr-4">Time <br /> Required</label>
                                <select
                                    name="timeRequired"
                                    id="timeRequired"
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData?.timeRequired || ""}
                                    onChange={(e) => setSubmitData({ ...submitData, timeRequired: e.target.value as "long" | "medium" | "short" })}
                                >
                                    <option value="">Choose one</option>
                                    <option value="long">Long</option>
                                    <option value="medium">Medium</option>
                                    <option value="short">Short</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <label htmlFor="description" className="mr-4">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="rounded min-h-6 text-[13px] text-black w-full max-w-sm p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="physics, maths"
                                    required
                                    value={submitData?.description}
                                    onChange={(e) => setSubmitData({ ...submitData, description: e.target.value })}
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="category" className="mr-5">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData?.category || ""}
                                    onChange={(e) => setSubmitData({ ...submitData, category: e.target.value as "side-hustle" | "home" | "personal" | "school" })}
                                >
                                    <option value="">Choose one</option>
                                    <option value="side-hustle">Side Hustle</option>
                                    <option value="home">Home</option>
                                    <option value="personal">Personal</option>
                                    <option value="school">School</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <label htmlFor="status" className="mr-10">Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={submitData?.status || ''}
                                    onChange={(e) => setSubmitData({ ...submitData, status: e.target.value as "todo" | "in-progress" | "completed" })}
                                >
                                    <option value="">Choose one</option>
                                    <option value="todo">Todo</option>
                                    <option value="in-progress">In-Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <ToolTip text="Submit">
                                {loading ? <button className="bg-highlight cursor-not-allowed opacity-80 mx-auto block p-2">Adding Task...</button> : <button className="bg-accent hover:bg-highlight transition p-2 rounded mx-auto block"
                                    type="submit"><Plus /></button>}
                            </ToolTip>
                        </form>
                    </div>
                </section >
            </div>
        </div>
    )
}