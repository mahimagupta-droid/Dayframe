import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { Tasks } from "@/lib/models/Tasks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ taskId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { taskId } = await context.params;
        const body = await request.json();

        await dbConnect();

        const updatedTask = await Tasks.findByIdAndUpdate(
            taskId,
            { ...body },
            { new: true }
        );

        if (!updatedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTask);
    } catch (error) {
        console.log("Error updating task:", error);
        return NextResponse.json({ message: "Error updating task" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ taskId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { taskId } = await context.params;

        await dbConnect();

        const deletedTask = await Tasks.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log("Error deleting task:", error);
        return NextResponse.json({ message: "Error deleting task" }, { status: 500 });
    }
}
