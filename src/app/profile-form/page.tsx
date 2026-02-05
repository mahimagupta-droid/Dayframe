"use client";

import { useState, useEffect } from "react";
import { UserType } from "@/lib/models/Users";

export default function ProfileForm() {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     try {
    //         setLoading(true);
    //     } catch (error) {
            
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);

    return (
        <div>
            <h1 className="text-2xl justify-center text-center mb-5 font-lexend">Fill in the user details</h1>
            <form action="POST" className="border p-6 space-y-5">
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
                        value={user?.email || ""}
                        onChange={(e) => setUser({...user, email: e.target.value } as UserType)}
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
                        value={user?.name || ""}
                        onChange={(e) => setUser({...user, name: e.target.value } as UserType)}
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
                        defaultValue="selectOne" 
                        value={user?.educationLevel || "selectOne"}
                        onChange={(e) => setUser({...user, educationLevel: e.target.value} as UserType)}
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
                        value={user?.age || ""}
                        onChange={(e) => setUser({ ...user, age: Number(e.target.value) } as UserType)}
                    />
                </div>
            </form>
            <div className="text-center mt-4 bg-red-600 justify-center rounded text-white font-lexend w-32 mx-auto p-2 cursor-pointer hover:bg-green-600 transition-colors">
                {loading ? "Submitting form" : "Submit"}
            </div>
        </div>
    )
}