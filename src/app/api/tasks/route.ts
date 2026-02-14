import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { Tasks } from "@/lib/models/Tasks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

//CREATE
export async function POST(request: NextRequest) {
  try {
    const {userId} = await auth();
    if(!userId) return NextResponse.json(
      {message: "User unauthorised!"},
      {status: 401}
    )
    await dbConnect();
    const body = await request.json();
    // check if the date format is invalid
    const date = new Date(body.deadline)
    if (isNaN(date.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 },
      );
    }
    //check if deadline date entered is of past
    if (date < new Date(new Date().setHours(0, 0, 0, 0))) {
      return NextResponse.json(
        { error: "Deadline cannot be in the past." },
        { status: 400 },
      );
    }
    // check if every field meets the criteria or not " '' "
    const fieldsToCheck = ['priority', 'difficulty', 'timeRequired', 'category', 'status']
    fieldsToCheck.forEach((field) => {
      if(body[field] === ''){
        body[field] = undefined
      }
    });
    const {title, deadline, priority, difficulty, timeRequired, description, category, status} = body;
    const task = await Tasks.create({
      clerkId: userId,
      title, 
      deadline, 
      priority, 
      difficulty, 
      timeRequired, 
      description, 
      category, 
      status
    })
    if(task){
      return NextResponse.json({
        success: true,
        tasks: task
      })
    } else {
      return NextResponse.json(
        {message: "Error adding tasks"},
        {status: 404}
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {message: error.message},
      {status: 500}
    )
  }
}

// READ
export async function GET() {
  try {
    const {userId} = await auth();
    if(!userId) return NextResponse.json(
      {message: "User unauthorised!"},
      {status: 401}
    )
    await dbConnect();
    const taskBody = await Tasks.find({clerkId: userId})
    if(taskBody){
      return NextResponse.json({
        success: true,
        tasks: taskBody
      })
    } else {
      return NextResponse.json(
        {message: "Error loading tasks"},
        {status: 404}
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {message: error.message},
      {status: 500}
    )
  }
}


// //UPDATE
// export async function PUT(params:type) {
  
// }

// // DELETE
// export async function DELETE(params:type) {
  
// }