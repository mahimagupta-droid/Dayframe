import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { User } from "@/lib/models/Users";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, name, educationLevel, age} = reqBody;
        const {userId} = await auth();
        await dbConnect();
        const newUser = await User.create({
            clerkId: userId,
            email: email,
            name: name,
            educationLevel: educationLevel,
            age: age
        });
        return NextResponse.json({
            success: true,
            user: newUser
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            {status: 500}
        )
    }
}