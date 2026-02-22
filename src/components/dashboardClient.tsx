/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CheckCircle2, Clock, Target, AlertCircle } from "lucide-react";
import StatsCard from "./statsCard";
import { GoalsTypes } from "@/lib/models/Goals";
import { TasksTypes } from "@/lib/models/Tasks";
import { UserType } from "@/lib/models/Users";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
export default function DashboardClient() {
    console.log("Dashboard mounted");
    const [userData, setUserData] = useState<UserType | null>(null);
    const [tasks, setTasks] = useState<TasksTypes[]>([])
    const [goals, setGoals] = useState<GoalsTypes[]>([])
    const [loading, setLoading] = useState(false);
    const [quote, setQuote] = useState("");
    const fetchUser = async () => {
        try {
            const response = await fetch("/api/user", {
                method: "GET"
            });
            if (response.ok) {
                const body = await response.json();
                if (body.success && body.user) {
                    setUserData(body.user)
                }
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        }
    }

    const fetchTasks = async () => {
        try {
            const response = await fetch("/api/tasks", {
                method: "GET"
            })
            if (response.ok) {
                const body = await response.json();
                if (body.success && body.tasks) {
                    setTasks(body.tasks)
                }
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        }
    }

    const fetchGoals = async () => {
        try {
            const response = await fetch("/api/goals", {
                method: "GET"
            })
            if (response.ok) {
                const body = await response.json();
                if (body.success && body.goals) {
                    setGoals(body.goals)
                }
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`)
        }
    }

    const fetchAllData = async () => {
        setLoading(true);
        await Promise.all([
            fetchUser(),
            fetchTasks(),
            fetchGoals()
        ]);
        setLoading(false);
    };
    console.log(userData)
    console.log(goals)
    console.log(tasks)

    //task analytics
    const countTotalTasks = () => {
        return tasks.length;
    }

    const getCompletedTasks = () => {
        return tasks.filter((task) => task.status == "completed").length;
    }

    const getOngoingTasks = () => {
        return tasks.filter((task) => task.status == "in-progress" || task.status == "todo").length;
    }

    const getTodaysTasks = () => {
        const today = new Date().setHours(0, 0, 0, 0); // Reset time to midnight;
        return tasks.filter((task) => {
            const deadline = new Date(task.deadline).setHours(0, 0, 0, 0);
            return deadline == today;
        });
    };

    const getOverdueTasks = () => {
        const today = new Date().setHours(0, 0, 0, 0);
        return tasks.filter((task) => {
            const deadline = new Date(task.deadline).setHours(0, 0, 0, 0);
            return (deadline < today && task.status !== "completed");
        })
    }

    //goal analytics
    const getActiveGoals = () => {
        return goals.filter((goal) => goal.status == "in-progress" || goal.status == "todo").length;
    }

    const getAverageProgress = () => {
        let sum = 0;
        goals.forEach((goal) => {
            sum += goal.progress
        });
        const average = sum / goals.length;
        return Math.round(average);
    }

    const getNearCompletion = () => {
        return goals.filter((goal) => goal.progress >= 80).length;
    }

    const motivationQuotes = [
        "Discipline today, freedom tomorrow.",
        "Small steps. Every single day.",
        "Consistency > Motivation.",
        "Do it tired. Do it bored. Just do it.",
        // "“Your future self is watching.”",
        "Debug your life like your code.",
        "Focus. Finish. Repeat.",
        "Progress over perfection.",
        "Stop scrolling. Start building.",
        "Be obsessed or be average.",
        // "Healing and hustling can coexist.",
        "Keep going, quietly."
    ];
    const getMotivationQuotes = () => {
        const randomIdx = Math.floor(Math.random() * motivationQuotes.length);
        return motivationQuotes[randomIdx];
    };
    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) {
            return "Good Morning"
        } else if (hours < 18) {
            return "Good Afternoon"
        } else {
            return "Good Evening"
        }
    }
    useEffect(() => {
        fetchAllData();
        setQuote(getMotivationQuotes());
    }, [])
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    };
    return (
        <div className=" bg-black p-6">
<div className="w-full space-y-8">
                <div className="space-y-2 mt-16">
                    <h1 className="text-4xl font-bold text-white">
                        {getGreeting()}, {userData?.name || "Student"}!
                    </h1>
                    <h2 className="p-5 text-lg">{getMotivationQuotes()}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        title="Total Tasks"
                        value={countTotalTasks()}
                        icon={Target}
                        color="blue"
                        gradient="from-blue-500 to-blue-600"
                    />
                    <StatsCard
                        title="Completed"
                        value={getCompletedTasks()}
                        icon={CheckCircle2}
                        color="green"
                        gradient="from-green-500 to-green-600"
                    />
                    <StatsCard
                        title="In Progress"
                        value={getOngoingTasks()}
                        icon={Clock}
                        color="yellow"
                        gradient="from-yellow-500 to-yellow-600"
                    />
                    <StatsCard
                        title="Overdue"
                        value={getOverdueTasks().length}
                        icon={AlertCircle}
                        color="red"
                        gradient="from-red-500 to-red-600"
                    />
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        📋 Today's Tasks
                    </h2>

                    {getTodaysTasks().length === 0 ? (
                        <p className="text-gray-400">No tasks due today! 🎉</p>
                    ) : (
                        <div className="space-y-3">
                            {getTodaysTasks().map((task) => (
                                <div
                                    key={task._id}
                                    className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg"
                                >
                                    <div>
                                        <h3 className="text-white font-medium">{task.title}</h3>
                                        <p className="text-gray-400 text-sm">{task.description}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                        {task.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <StatsCard
                        title="Active Goals"
                        value={getActiveGoals()}
                        icon={Target}
                        color="purple"
                        gradient="from-purple-500 to-purple-600"
                    />

                    <StatsCard
                        title="Average Progress"
                        value={getAverageProgress()}
                        icon={CheckCircle2}
                        color="blue"
                        gradient="from-blue-500 to-cyan-600"
                    />

                    <StatsCard
                        title="Near Completion"
                        value={getNearCompletion()}
                        icon={CheckCircle2}
                        color="green"
                        gradient="from-green-500 to-emerald-600"
                    />
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        🎯 Your Goals
                    </h2>

                    {goals.length === 0 ? (
                        <p className="text-gray-400">No goals set yet. Time to dream big! 🚀</p>
                    ) : (
                        <div className="space-y-4">
                            {goals.map((goal) => (
                                <div key={goal._id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-white font-medium">{goal.title}</h3>
                                        <span className="text-gray-400 text-sm">{goal.progress}%</span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full transition-all ${goal.progress >= 80 ? 'bg-green-500' :
                                                    goal.progress >= 50 ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                                }`}
                                            style={{ width: `${goal.progress}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-gray-500">
                                            Due: {new Date(goal.dueDate).toLocaleDateString()}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs ${goal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                goal.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {goal.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a
                        href="/tasks"
                        className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-xl font-bold mb-2">Add New Task</h3>
                                <p className="text-blue-100">Create and manage your tasks</p>
                            </div>
                            <span className="text-4xl group-hover:scale-110 transition-transform">📋</span>
                        </div>
                    </a>
                    <a
                        href="/goals"
                        className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl hover:scale-105 transition-transform cursor-pointer group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white text-xl font-bold mb-2">Set New Goal</h3>
                                <p className="text-purple-100">Track your long-term objectives</p>
                            </div>
                            <span className="text-4xl group-hover:scale-110 transition-transform">🎯</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
} 