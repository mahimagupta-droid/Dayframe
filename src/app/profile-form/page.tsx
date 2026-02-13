/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { UserType } from "@/lib/models/Users";
import toast from "react-hot-toast";
export default function ProfileForm() {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserType | null>(null);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            
            toast.success("User profile created successfully!")
            handleFetch();
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error creating user profile")
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/user", {
                method: "DELETE"
            })
            if (response.ok) {
                toast.success("User profile deleted successfully!")
                setUser(null);
                setFormData(null);
            } else {
                toast.error("Error deleting user profile")
            }
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleFetch = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/user")
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.user) {
                    setUser(data.user);
                    console.log("successful data fetch", data.user);
                } else {
                    console.error("Data fetch unsuccessful or user not found:", data);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = async () => {
        try {
            setIsEditing(true);
            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                toast.success("User profile updated successfully!")
                handleFetch();
            } else {
                toast.error("Error updating user profile")
            }
        } catch (error: any) {
            setIsEditing(false);
            console.log(error.message)
            toast.error(error.message)
        } finally {
            setIsEditing(false);
        }
    }

    console.log((user))
    useEffect(() => {
        handleFetch();
    }, [])

    if (isEditing) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl text-center mb-5 font-lexend">Edit user details</h1>
                    <form action="POST" className="border p-6 space-y-5" onSubmit={handleEdit}>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="text-black text-[15px] p-0.5 rounded w-48"
                                value={formData?.email || ""}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value } as UserType)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="name"
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="text-black text-[15px] p-0.5 rounded w-48"
                                value={formData?.name || ""}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value } as UserType)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="age"
                            >
                                Age:
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                required
                                className="text-black text-[15px] p-0.5 rounded w-48"
                                value={formData?.age || ""}
                                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) } as UserType)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="educationLevel"
                                className="flex-shrink-0"
                            >
                                Education<br />Level
                            </label>
                            <select
                                id="educationLevel"
                                name="educationLevel"
                                required
                                className="text-black text-[15px] p-0.5 rounded w-48"
                                value={formData?.educationLevel || "selectOne"}
                                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value } as UserType)}
                            >
                                <option value="selectOne" disabled>Select one</option>
                                <option
                                    value="high-school"
                                    className="text-black"
                                >
                                    High School
                                </option>
                                <option
                                    value="bachelors"
                                    className="text-black"
                                >
                                    Bachelor&apos;s Degree
                                </option>
                                <option
                                    value="masters"
                                    className="text-black"
                                >
                                    Master&apos;s Degree
                                </option>
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

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen p-4">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
        )
    }

    if (user != null && !loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <div className="space-y-2 p-5 border rounded w-full max-w-md">
                    <p>User Profile</p>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                    <p>Education Level: {user.educationLevel}</p>
                </div>
                <div className="flex items-center justify-center gap-4 mt-5">
                    <button
                        className="bg-red-600 hover:bg-green-500 transition p-2 rounded"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-600 hover:bg-green-500 transition p-2 rounded"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <h1 className="text-3xl text-center mb-5 font-lexend">Fill in the user details</h1>
                <form action="POST" className="border p-6 space-y-5 bg-cyan-800 rounded" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="text-black text-[15px] p-0.5 rounded w-48"
                            value={formData?.email || ""}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value } as UserType)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="name"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="text-black text-[15px] p-0.5 rounded w-48"
                            value={formData?.name || ""}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value } as UserType)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="educationLevel"
                            className="flex-shrink-0 mr-3"
                        >
                            Education<br />Level
                        </label>
                        <select
                            id="educationLevel"
                            name="educationLevel"
                            required
                            className="text-black text-[15px] p-0.5 rounded w-48"
                            value={formData?.educationLevel || "selectOne"}
                            onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value } as UserType)}
                        >
                            <option value="selectOne" disabled>Select one</option>
                            <option
                                value="high-school"
                                className="text-black"
                            >
                                High School
                            </option>
                            <option
                                value="bachelors"
                                className="text-black"
                            >
                                Bachelor&apos;s Degree
                            </option>
                            <option
                                value="masters"
                                className="text-black"
                            >
                                Master&apos;s Degree
                            </option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="age"
                        >
                            Age:
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            required
                            className="text-black text-[15px] p-0.5 rounded w-48"
                            value={formData?.age || ""}
                            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) } as UserType)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button className="text-center bg-red-600 rounded text-white font-lexend px-8 py-2 cursor-pointer hover:bg-green-600 transition-colors" type="submit">
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}