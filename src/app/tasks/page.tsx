"use client";
export default function Tasks() {
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    // }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <div className="text-2xl mb-5">Fill in the task</div>
            <form action="POST" className="border rounded p-5 space-y-3">
                <div>
                    <label htmlFor="title" className="mr-12">Title</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required
                        className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                        placeholder="eg. complete assignments"
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
                    />
                </div>
                <div>
                    <label htmlFor="priority" className="mr-6">Priority</label>
                    <select 
                        name="priority" 
                        id="priority"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        defaultValue="choose-one"
                        required
                    >
                        <option value="choose-one" disabled>Choose one</option>
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
                        defaultValue="choose-one"
                        required
                    >
                        <option value="choose-one" disabled>Choose one</option>
                        <option value="hard">Hard</option>
                        <option value="medium">Medium</option>
                        <option value="easy">Easy</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="timeRequired" className="mr-4" >Time <br /> Required</label>
                    <select 
                        name="timeRequired" 
                        id="timeRequired"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        defaultValue="choose-one"
                        required
                    >
                        <option value="choose-one" disabled>Choose one</option>
                        <option value="long">Long</option>
                        <option value="medium">Short</option>
                        <option value="short">Short</option>
                    </select>
                </div>
                <div>
                    <label 
                        htmlFor="description" className="mr-4"
                    >
                        Description
                    </label>
                    <textarea 
                        name="description" 
                        id="description" 
                        className="rounded min-h-6 text-black w-36 text-[13px]"
                        placeholder="physics, maths"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category" className="mr-5">Category</label>
                    <select 
                        name="category" 
                        id="category"
                        className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                        defaultValue="choose-one"
                        required
                    >
                        <option value="choose-one" disabled>Choose one</option>
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
                        defaultValue="choose-one"
                        required
                    >
                        <option value="choose-one" disabled>Choose one</option>
                        <option value="todo">Todo</option>
                        <option value="in-progress">In-Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button className="bg-red-600 hover:bg-green-600 transition p-2 rounded mx-auto block" type="submit">Add Task</button>
            </form>
        </div>
    )
}