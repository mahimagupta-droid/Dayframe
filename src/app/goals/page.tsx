"use client";

import { GoalsTypes } from "@/lib/models/Goals";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Goals() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<GoalsTypes>>({});


    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <div className="text-2xl mb-5">Enter Goals</div>
            <form
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
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="difficulty" className="mr-4">Difficulty</label>
                    <select
                        name="difficulty"
                        id="difficulty"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        required
                        
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
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as "side-hustle" | "home" | "personal" | "school" })}
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
    )
}