/* eslint-disable @typescript-eslint/no-explicit-any */
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
    } catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            {status: 500}
        )
    }
}

export async function GET() {
    try {
        const {userId} = await auth();
        if(!userId) return NextResponse.json(
            {message: "Unauthorized"},
            {status: 401}
        )
        await dbConnect();
        const user = await User.findOne({clerkId: userId});
        if(user){
            return NextResponse.json({
                success: true,
                user: user
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 404
            })
        }
    } catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            {status: 500}
        )
    }
} 

export async function DELETE() {
    try {
        const {userId} = await auth();
        if(!userId) return NextResponse.json(
            {message: "Unauthorized"},
            {status: 401}
        )
        await dbConnect();
        const response = await User.deleteOne({clerkId: userId});
        if(response){
            return NextResponse.json({
                success: true,
                message: "User deleted successfully"
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 404
            })
        }        
    } catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            {status: 500}
        )
    }
}

export async function PUT(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, name, educationLevel, age} = reqBody;
        const {userId} = await auth();
        await dbConnect();
        const updatedUser = await User.findOneAndUpdate(
            {clerkId: userId},
            {email, name, educationLevel, age},
            {new: true}
        );
        if(updatedUser){
            return NextResponse.json({
                success: true,
                user: updatedUser
            })
        } else {
            return NextResponse.json({
                success: false,
                status: 404
            })
        }
    } catch (error: any) {
        return NextResponse.json(
            {message: error.message},
            {status: 500}
        )
    }
}