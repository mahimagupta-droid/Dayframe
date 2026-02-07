/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { UserType } from "@/lib/models/Users";
import toast from "react-hot-toast";
export default function ProfileForm() {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserType | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const response = await fetch("api/user")
            if (response.ok) {
                const data: UserType = await response.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (error: any) {
            setUser(null);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            toast.success("User profile created successfully!")
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error creating user profile")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return 
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
    }

    if(user && !isEditing){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="border p-3">
                    <p>Name: {user.name}</p>
                    <p>Educational Level: {user.educationLevel}</p>
                    <p>Email: {user.email}</p>
                    <p>Age: {user.age}</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl justify-center text-center mb-5 font-lexend">Fill in the user details</h1>
            <form action="POST" className="border p-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="email"
                        className="mr-5"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="text-black text-[15px] p-0.5 rounded"
                        value={formData?.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value } as UserType)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="name"
                        className="mr-3"
                    >
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="text-black text-[15px] p-0.5 rounded"
                        value={formData?.name || ""}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value } as UserType)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="educationLevel"
                        className="text-wrap mr-12"
                    >
                        Education<br />Level
                    </label>
                    <select
                        id="educationLevel"
                        name="educationLevel"
                        required
                        className="text-black text-[15px] p-0.5 rounded"
                        // defaultValue="selectOne" 
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
                <div>
                    <label
                        htmlFor="age"
                        className="mr-7"
                    >
                        Age:
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        required
                        className="text-black text-[15px] p-0.5 rounded"
                        value={formData?.age || ""}
                        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) } as UserType)}
                    />
                </div>
                <button className="text-center mt-4 bg-red-600 justify-center flex rounded text-white font-lexend w-32 mx-auto p-2 cursor-pointer hover:bg-green-600 transition-colors" type="submit">
                    {loading ? "Submitting form" : "Submit"}
                </button>
            </form>
        </div>
    )
}