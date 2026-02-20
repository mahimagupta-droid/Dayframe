/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TasksTypes } from "@/lib/models/Tasks";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Tasks() {
    const [submitData, setSubmitData] = useState<Partial<TasksTypes>>({});
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [taskData, setTaskData] = useState<TasksTypes[] | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const handleEditClick = (task: TasksTypes) => {
        console.log("Clicked Edit. Task:", task);
        setIsEditing(true);
        setSubmitData(task);
        if (task) {
            console.log("Setting submitData to:", task);
        }
        setEditingTaskId(task._id);
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            console.log("Submitting task data:", submitData);
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(submitData)
            })
            if (response.ok) {
                toast.success("successfully created the task...");
                console.log(response)
                setSubmitData({});
                await handleFetch();
            } else {
                toast.error("error creating the task")
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

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

    const handleEdit = async () => {
        if (!editingTaskId) return;
        try {
            setLoading(true);
            setIsEditing(true);
            const response = await fetch(`/api/tasks/${editingTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData)
            });
            if (response.ok) {
                toast.success("successfully edited the task...");
                console.log(response)
                setSubmitData({});
                await handleFetch();
            } else {
                toast.error("error updating the task")
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        } finally {
            setIsEditing(false)
            setLoading(false)
            setEditingTaskId(null);
            setSubmitData({});
        }
    }

    const handleDelete = async (id: string) => {
        try {
            setDeleteLoading(true);
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
            setDeleteLoading(false)
        }
    }
    
    useEffect(() => {
        handleFetch();
    }, [])

    if (isEditing) {
        return (
            <div className="flex items-center justify-center h-screen w-full overflow-hidden">
                <div className="flex flex-col items-center justify-center w-[75%] p-2 rounded">
                    <div className="text-2xl mb-5">Edit task</div>
                    <form
                        onSubmit={handleEdit}
                        className="rounded p-2 space-y-3"
                    >
                        <div className="p-3">
                            <label htmlFor="title" className="mr-12">Title</label>
                            <input
                                type="text"
                                id="edit-title"
                                name="title"
                                required
                                className="text-black text-[13px] p-0.5 rounded bg-white w-40"
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
                                className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                className="rounded min-h-6 text-black w-36 text-[13px] border bg-gray-50"
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
                                className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-green-500 transition p-2 rounded">
                                Update
                            </button>
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-green-500 transition p-2 rounded"
                                onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <div className="space-y-4">
            <div className=" flex flex-col items-center justify-center p-2 rounded">
                <p className="text-xl font-bold">
                    Daily actions and to-dos that keep you moving forward. These are the small steps that add up to big wins. What needs to get done today?
                </p>
                <p className="text-end opacity-90">
                    Tasks are specific, actionable items with clear deadlines. Check them off as you complete them!
                </p>
            </div>
            <div className="flex gap-6 justify-center items-start px-4">
                <section className="w-1/2 flex">
                    <div className="flex flex-col items-center w-[75%] rounded h-[75vh] p-1 border bg-neutral-900 overflow-y-auto scrollbar-thin">
                        <div className="mt-10">
                            <h2 className="text-xl mb-4">Your Tasks</h2>
                            {taskData?.length === 0 ? (
                                <p>No tasks found</p>
                            ) : (
                                taskData?.map((task, index) => (
                                    <div key={index} className="flex">
                                        <div className="border p-3 mb-2 rounded">
                                            <h3 className="font-bold">{task.title}</h3>
                                            <p>{task.description || "No description provided"}</p>
                                            <p>Status: {task.status}</p>
                                        </div>
                                        <button onClick={() => handleEditClick(task)} className="bg-red-700 p-2 m-3 cursor-pointer rounded">Edit</button>
                                        {deleteLoading ? <button className="bg-red-700 cursor-not-allowed opacity-80 mx-auto block p-2">Adding Task...</button> : <button className="hover:bg-green-600 bg-red-700 p-2 m-3 cursor-pointer rounded"
                                            onClick={() => handleDelete(task._id)}>Delete</button>}
                                        {/* <button onClick={() => handleDelete(task._id)} className="bg-red-700 p-2 m-3 cursor-pointer rounded">Delete</button> */}
                                    </div>
                                ))
                            )}
                        </div>
                        <div>
                        </div>
                    </div>
                </section>
                <section className="w-1/2 flex justify-center">
                    <div className="flex flex-col items-center justify-center w-[75%] p-1 rounded border bg-neutral-900 overflow-y-auto scrollbar-thin">
                        <div className="text-2xl mb-5">Fill in the task</div>
                        <form
                            onSubmit={handleSubmit}
                            className="rounded p-2"
                        >
                            <div className="p-3">
                                <label htmlFor="title" className="mr-12">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    required
                                    className="text-black text-[13px] p-0.5 rounded bg-white w-40"
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
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                                    value={submitData?.deadline instanceof Date ? submitData.deadline.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setSubmitData({ ...submitData, deadline: new Date(e.target.value) })}
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="priority" className="mr-6">Priority</label>
                                <select
                                    name="priority"
                                    id="priority"
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                    className="rounded min-h-6 text-black w-36 text-[13px]"
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
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
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
                            {loading ? <button className="bg-red-700 cursor-not-allowed opacity-80 mx-auto block p-2">Adding Task...</button> : <button className="bg-red-600 hover:bg-green-600 transition p-2 rounded mx-auto block"
                                type="submit">Add Task</button>}
                        </form>
                    </div>
                </section >
            </div>
        </div>
    )
}