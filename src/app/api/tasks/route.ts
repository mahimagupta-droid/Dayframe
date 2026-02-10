import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { Tasks } from "@/lib/models/Tasks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();
    const {
      title,
      deadline,
      priority,
      description,
      category,
      difficulty,
      timeRequired,
      status,
    } = await request.json();
    const newTask = await Tasks.create({
      clerkId: userId,
      title,
      deadline,
      priority,
      description,
      category,
      difficulty,
      timeRequired,
      status,
    });
    return NextResponse.json({
      success: true,
      task: newTask,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
