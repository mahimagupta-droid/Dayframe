"use client";

import { TasksTypes } from "@/lib/models/Tasks";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Tasks() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<TasksTypes>>({});
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            setFormData({});
            if (response.ok) {
                setFormData({})
                toast.success("Task added successfully!");
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.error}`);
            }
        } catch (error) {
            setLoading(false);
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            toast.error(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <div className="text-2xl mb-5">Fill in the task</div>
            <form 
                onSubmit={handleSubmit} 
                className="border rounded p-5 space-y-3"
            >
                <div>
                    <label htmlFor="title" className="mr-12">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                        placeholder="eg. complete assignments"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>
                
                <div>
                    <label htmlFor="deadline" className="mr-4">Deadline</label>
                    <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        required
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        value={formData.deadline instanceof Date ? formData.deadline.toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({...formData, deadline: new Date(e.target.value)})}
                    />
                </div>
                
                <div>
                    <label htmlFor="priority" className="mr-6">Priority</label>
                    <select 
                        name="priority" 
                        id="priority"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        required
                        value={formData.priority || ''}
                        onChange={(e) => setFormData({...formData, priority: e.target.value as "high" | "medium" | "low"})}
                    >
                        <option value="">Choose one</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="difficulty" className="mr-4">Difficulty</label>
                    <select 
                        name="difficulty" 
                        id="difficulty" 
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        required
                        value={formData.difficulty || ''}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value as "hard" | "medium" | "easy"})}
                    >
                        <option value="">Choose one</option>
                        <option value="hard">Hard</option>
                        <option value="medium">Medium</option>
                        <option value="easy">Easy</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="timeRequired" className="mr-4">Time <br /> Required</label>
                    <select 
                        name="timeRequired" 
                        id="timeRequired"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        required
                        value={formData.timeRequired || ''}
                        onChange={(e) => setFormData({...formData, timeRequired: e.target.value as "long" | "medium" | "short"})}
                    >
                        <option value="">Choose one</option>
                        <option value="long">Long</option>
                        <option value="medium">Medium</option>
                        <option value="short">Short</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="description" className="mr-4">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        className="rounded min-h-6 text-black w-36 text-[13px]"
                        placeholder="physics, maths"
                        required
                        value={formData.description || ''}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                </div>
                
                <div>
                    <label htmlFor="category" className="mr-5">Category</label>
                    <select 
                        name="category" 
                        id="category"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        required
                        value={formData.category || ''}
                        onChange={(e) => setFormData({...formData, category: e.target.value as "side-hustle" | "home" | "personal" | "school"})}
                    >
                        <option value="">Choose one</option>
                        <option value="side-hustle">Side Hustle</option>
                        <option value="home">Home</option>
                        <option value="personal">Personal</option>
                        <option value="school">School</option>
                    </select>
                </div>
                
                <div>
                    <label htmlFor="status" className="mr-10">Status</label>
                    <select 
                        name="status" 
                        id="status"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        required
                        value={formData.status || ''}
                        onChange={(e) => setFormData({...formData, status: e.target.value as "todo" | "in-progress" | "completed"})}
                    >
                        <option value="">Choose one</option>
                        <option value="todo">Todo</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                
                <button 
                    className="bg-red-600 hover:bg-green-600 transition p-2 rounded mx-auto block" 
                    type="submit"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}