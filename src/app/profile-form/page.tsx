"use client";

import { UserType } from "@/lib/models/Users";
import { useState, useEffect } from "react";

export default function ProfileForm() {
    // const [user, setUser] = useState<UserType | null>(null);
    return (
        
            <form action="POST" className="border p-6 space-y-5">
                <div className="p-4">
                    <label
                        htmlFor="email"
                        className="m-4"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="border rounded-[6px]"
                        // value={user?.email}
                    />
                </div>
                <div>
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
                        className="border rounded-[6px]"
                    />
                </div>
                <div>
                    <label
                        htmlFor="educationLevel"
                    >
                        Education Level:
                    </label>
                    <select
                        id="educationLevel"
                        name="educationLevel"
                        required
                    >
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
                    >
                        Age:
                    </label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        required
                    />
                </div>
            </form>

    )
}