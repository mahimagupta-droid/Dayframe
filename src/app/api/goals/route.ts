/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { Goals } from "@/lib/models/Goals";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json(
        { message: "User unauthorised" },
        { status: 401 },
      );
    await dbConnect();
    const body = await request.json();
    //check for valid date
    const date = new Date(body.dueDate);
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 },
      );
    }

    // Check if deadline is in the past
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) {
      return NextResponse.json(
        { error: "Deadline cannot be in the past." },
        { status: 400 },
      );
    }
    //check if any of the fields that have enums are empty strings, if they are, set them to undefined so that the default value is used in the schema
    const fieldsToCheck = ["category", "status"];
    fieldsToCheck.forEach((field) => {
      if (body[field] === "") {
        body[field] = undefined;
      }
    });
    const { title, description, dueDate, category, progress, status, milestones } = body;
    const newGoal = await Goals.create({
      clerkId: userId,
      title,
      description,
      dueDate,
      category,
      progress,
      status,
      milestones,
    });
    return NextResponse.json({
      success: true,
      goal: newGoal,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User unauthorised" }, // Added success: false
        { status: 401 }
      );
    }

    await dbConnect();
    const userGoals = await Goals.find({ clerkId: userId });

    return NextResponse.json({
      success: true,
      goals: userGoals || [], // Ensure it returns empty array if none found
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}