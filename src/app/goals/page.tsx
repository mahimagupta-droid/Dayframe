export default function Goals() {
    return (
        <div className="flex items-center justify-center h-screen w-full overflow-hidden gap-14 ml-4">
            <section className="w-1/2 p-2 h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
                <div className="flex flex-col items-center justify-center w-[75%] border rounded">
                    goals fetched data
                </div>
            </section>
            <section className="w-1/2 p-2 h-[80vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] mr-4">
                <div className="flex flex-col items-center justify-center w-[75%] border rounded">
                    <form action="POST" className="rounded p-2">
                        <div>Fill the Goals here!</div>
                        <div>
                            <div className="p-3">
                                <label
                                    htmlFor="title"
                                    className="mr-12"
                                >
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                                />
                            </div>
                            <div className="p-3">
                                <label
                                    htmlFor="description"
                                    className="mr-12"
                                >
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="rounded min-h-6 text-black w-36 text-[13px]"
                                />
                            </div>
                            <div className="p-3">
                                <label
                                    htmlFor="dueDate"
                                    className="mr-12"
                                >
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="category" className="mr-5">Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    className="text-black text-[15px] p-0.5 rounded bg-white w-40"
                                    required
                                >
                                    <option value="">Choose one</option>
                                    <option value="side-hustle">side-hustle</option>
                                    <option value="home">home</option>
                                    <option value="personal">personal</option>
                                    <option value="school">school</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <label className="mr-5 font-medium">Progress (%)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="text-black text-[13px] p-0.5 rounded bg-white w-40"
                                    placeholder="0 - 100"
                                />
                            </div>
                            <div className="p-3">
                                <label htmlFor="status" className="mr-5">Status</label>
                                <select name="status" id="status" className="text-black text-[15px] p-0.5 rounded bg-white w-40">
                                    <option value="">Choose one</option>
                                    <option value="todo">todo</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="completed">completed</option>
                                </select>
                            </div>
                            <div className="p-3">
                                <p>Create Milestones</p>
                                <div>
                                    <div>
                                        <label htmlFor="title">Title</label>
                                        <input type="text" name="title" id="title" />
                                    </div>
                                    <div className="flex flex-row">
                                        <label htmlFor="completed?">Completed?</label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="milestoneCompleted"
                                                value="yes"
                                                className="accent-indigo-600"
                                            />
                                            Yes
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="milestoneCompleted"
                                                value="no"
                                                className="accent-indigo-600"
                                            />
                                            No
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="completedAt">Completed At?</label>
                                        <input type="date" name="completedAt" id="completedAt" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-3">
                            <button className="bg-red-600 p-2 rounded">Create Goal</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}