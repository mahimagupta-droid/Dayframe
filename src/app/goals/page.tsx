/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GoalsTypes } from "@/lib/models/Goals";
import { Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ToolTip from "@/components/tootTip";
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
    const [fetchedData, setFetchedData] = useState<GoalsTypes[] | null>(null)
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("/api/goals", {
                method: "POST",
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
                await handleFetch();
            } else {
                toast.error(data.error || "Failed to create goal");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFetch = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/goals");
            const body = await response.json();
            if (response.ok && body.success) {
                setFetchedData(body.goals);
            } else {
                const errorMsg = body.error || "Failed to fetch goals";
                toast.error(errorMsg);
                setFetchedData([]);
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            setDeleting(true);
            const response = await fetch(`/api/goals/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                toast.success("Clicked goal deleted successfully")
                setFetchedData(null);
                setFormData({});
                await handleFetch();
            } else {
                toast.error("Error deleting clicked goal")
            }

        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setDeleting(false);
        }
    }

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData._id) return;
        try {
            setLoading(true);
            const response = await fetch(`/api/goals/${formData._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                toast.success("Selected goal updated successfully!");
                setFormData({
                    milestones: [
                        {
                            title: "",
                            completed: false,
                            completedAt: undefined,
                        },
                    ],
                });
                setEditing(false);
                await handleFetch();
            } else {
                toast.error("Error updating selected goal.");
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    const startEditing = (goal: GoalsTypes) => {
        setFormData({
            ...goal,
            dueDate: goal.dueDate ? new Date(goal.dueDate) : undefined,
            milestones: goal.milestones?.map(m => ({
                ...m,
                completedAt: m.completedAt ? new Date(m.completedAt) : undefined
            }))
        });
        setEditing(true);
    };
    useEffect(() => {
        handleFetch()
    }, [])

    if (editing) {
        return (
            <section className="w-full flex justify-center mt-24 mb-8">
                <div className="flex flex-col items-center justify-center w-full lg:w-[75%] p-1 rounded border h-[84vh] overflow-y-auto bg-card">
                    <div className="text-2xl underline">Edit the Goals here!</div>
                    <form className="rounded p-2" onSubmit={handleEdit}>
                        <div className="p-3">
                            <label
                                htmlFor="title"
                                className="mr-12 text-textSecondary"
                            >
                                Title:
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title || ""}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="p-3">
                            <label
                                htmlFor="description"
                                className="mr-12 text-textSecondary"
                            >
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                value={formData.description || ""}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="p-3">
                            <label
                                htmlFor="dueDate"
                                className="mr-12 text-textSecondary"
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
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="p-3">
                            <label htmlFor="category" className="mr-5 text-textSecondary">Category</label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category || ""}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as "side-hustle" | "home" | "personal" | "school" })}
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <label className="mr-5 font-medium text-textSecondary">Progress (%)</label>
                            <input
                                type="number"

                                max="100"
                                name="progress"
                                value={formData.progress}
                                onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0 - 100"
                                required
                            />
                        </div>
                        <div className="p-3">
                            <label htmlFor="status" className="mr-5 text-textSecondary">Status</label>
                            <select
                                name="status"
                                id="status"
                                value={formData.status || ""}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as "todo" | "in-progress" | "completed" })}
                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="" disabled>Choose one</option>
                                <option value="todo">todo</option>
                                <option value="in-progress">in-progress</option>
                                <option value="completed">completed</option>
                            </select>
                        </div>
                        <div className="p-3">
                            <p className="font-medium mb-2 text-textSecondary">Create Milestone</p>

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
                                            className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <div className="flex items-center justify-center mt-3">
                            <ToolTip text="Save Changes">
                                {loading ? <button className="bg-highlight p-2 rounded cursor-not-allowed opacity-50">Editing Goal</button> : <button className="bg-accent p-2 rounded cursor-pointer hover:bg-highlight transition-colors" type="submit"><Plus /></button>}
                            </ToolTip>
                        </div>
                    </form>
                </div>
            </section>
        )
    }
    return (
        <div className="space-y-6">
            <div className=" flex flex-col items-center justify-center p-2 rounded mt-20">
                <p className="text-xl font-bold">
                    The big picture. Where do you want to be in 3 months? 6 months? This year? Set meaningful goals and track your progress over time.
                </p>
                <p className="text-end opacity-90">
                    Goals are long-term achievements that require multiple steps. Break them down into milestones and watch your progress grow!
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center lg:items-start px-4 w-full">
                <section className="w-full lg:w-1/2 pt-6 pr-2 bg-card border-borderPrimary flex-1 overflow-y-auto">
                    {fetchedData && fetchedData.length > 0 ? <div className="flex flex-col w-full max-w-xl mx-auto">
                        {fetchedData?.map((goal) => {
                            return (
                                <div
                                    key={goal._id}
                                    className="w-full bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-5 mb-4 hover:border-gray-600 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 flex flex-col justify-center items-center"
                                >
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {goal.title}
                                    </h3>

                                    <p className="text-sm text-gray-400 mb-2">
                                        {goal.description}
                                    </p>

                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <span>{goal.category}</span>
                                        <span>{new Date(goal.dueDate).toLocaleDateString()}</span>
                                    </div>

                                    <div className="mt-2">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${goal.status === "completed"
                                                ? "bg-green-500/20 text-green-400"
                                                : goal.status === "in-progress"
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : "bg-gray-500/20 text-gray-400"}`}
                                        >
                                            {goal.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-row gap-y-1 items-center justify-center gap-4 mt-2">
                                        <ToolTip text="Delete">
                                            {deleting ? <button className="bg-highlight opacity-50 cursor-not-allowed"><X /></button> : <button onClick={() => goal._id && handleDelete(goal._id)} className="bg-accent hover:bg-highlight cursor-pointer text-white rounded p-2"><X /></button>}
                                        </ToolTip>
                                        <ToolTip text="Edit">
                                            {editing ? <button className="bg-highlight opacity-50 cursor-not-allowed"><Save /></button> : <button onClick={() => startEditing(goal)} className="bg-accent hover:bg-highlight cursor-pointer text-white rounded p-2"><Save /></button>}
                                        </ToolTip>
                                    </div>
                                </div>
                            )
                        })}
                    </div> : <div className="text-3xl">No goals entered yet</div>}
                </section>
                <section className="w-full lg:w-1/2 flex justify-center flex-1 overflow-y-auto">
                    <div className="flex flex-col items-center justify-center w-full lg:w-[75%] p-1 rounded border-borderPrimary bg-card">
                        <div className="text-2xl underline">Fill the Goals here!</div>
                        <form className="rounded p-2" onSubmit={handleSubmit}>
                            <div className="p-3">
                                <label
                                    htmlFor="title"
                                    className="mr-12 text-textSecondary"
                                >
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title || ""}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label
                                    htmlFor="description"
                                    className="mr-12 text-textSecondary"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description || ""}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label
                                    htmlFor="dueDate"
                                    className="mr-12 text-textSecondary"
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
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="category" className="mr-5 text-textSecondary">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    value={formData.category || ""}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as "side-hustle" | "home" | "personal" | "school" })}
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                <label className="mr-5 font-medium text-textSecondary">Progress (%)</label>
                                <input
                                    type="number"
                                    max="100"
                                    name="progress"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0 - 100"
                                    required
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="status" className="mr-5 text-textSecondary">Status</label>
                                <select
                                    name="status"
                                    id="status"
                                    value={formData.status || ""}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "todo" | "in-progress" | "completed" })}
                                    className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="" disabled>Choose one</option>
                                    <option value="todo">todo</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <p className="font-medium mb-2 text-textSecondary">Create Milestone</p>

                                {formData.milestones?.map((milestone, index) => (
                                    <div key={index} className="border-borderPrimary p-3 rounded space-y-3">
                                        <div>
                                            <label className="mr-3 text-textSecondary">Title</label>
                                            <input
                                                type="text"
                                                value={milestone.title}
                                                onChange={(e) => {
                                                    const updatedMilestones = [...(formData.milestones || [])];
                                                    updatedMilestones[index].title = e.target.value;
                                                    setFormData({ ...formData, milestones: updatedMilestones });
                                                }}
                                                className="text-black w-full max-w-sm p-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <label className="text-textSecondary">Completed?</label>
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
                                            <label className="mr-3 text-textSecondary">Completed At</label>
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
                            <div className="flex items-center justify-center mt-3">
                                <ToolTip text="Create Goal">
                                    {loading ? <button className="bg-highlight p-2 rounded cursor-not-allowed opacity-50">Creating Goal</button> : <button className="bg-accent p-2 rounded cursor-pointer hover:bg-highlight transition-colors" type="submit"><Plus /></button>}
                                </ToolTip>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    )
}