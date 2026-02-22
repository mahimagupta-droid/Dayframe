"use client";
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
        "“Discipline today, freedom tomorrow.”", 
        "“Small steps. Every single day.”", 
        "“Consistency > Motivation.”", 
        "“Do it tired. Do it bored. Just do it.”", 
        "“Your future self is watching.”", 
        "“Debug your life like your code.”", 
        "“Focus. Finish. Repeat.”", 
        "“Progress over perfection.”", 
        "“Stop scrolling. Start building.”", 
        "“Be obsessed or be average.”", 
        "“Healing and hustling can coexist.”", 
        "“Keep going, quietly.”"
    ]; 
    const getMotivationQuotes = () => {
        const randomIdx = Math.floor(Math.random() * motivationQuotes.length);
        return motivationQuotes[randomIdx];
    };
    const getGreeting = () => {
        const hours = new Date().getHours();
        if(hours<12) {
            return "Good Morning"
        } else if (hours<18) {
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
        <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Welcome Section */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white">
                    {getGreeting()}, {userData?.name || "Student"}! 
                </h1>
                <h2 className="p-5 text-lg">{getMotivationQuotes()}</h2>
            </div>

            {/* More sections will go here */}
            
        </div>
    </div>
);
} 