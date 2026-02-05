"use client";

export default function ProfileForm() {
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
                    />
                </div>
            </form>
        </div>
    )
}