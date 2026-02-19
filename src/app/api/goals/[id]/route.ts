import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { Goals } from "@/lib/models/Goals";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await dbConnect();
        const { id } = await params;
        if (!id)
            return NextResponse.json(
                { message: `Goal (id-${id}) not found!` },
                { status: 404 }
            );
        const response = await Goals.deleteOne({
            clerkId: userId,
            _id: id
        })
        if (!response) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Clicked goal not deleted...",
                },
                { status: 404 } // Set status to 404 or 400 so response.ok is false on client
            );
        }
        return NextResponse.json({
            success: true,
            message: "Clicked Goal Deleted Successfully!",
        });
    } catch (error) {
        console.log("Error deleting goal:", error);
        return NextResponse.json(
            { message: "Error deleting goal" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest, {params} : {params: Promise<{id: string}>}) {
    try {
        const {userId} = await auth();
        if (!userId)
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        await dbConnect();
        const reqBody = await request.json();
        const {id} = await params;
        const updatedGoal = await Goals.updateOne(
            {clerkId: userId, _id: id},
            {...reqBody},
            {new: true}
        );
         if (!updatedGoal) {
            return NextResponse.json({ message: "Goal not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            goals: updatedGoal
        });
    } catch (error) {
        console.log("Error updating selected goal:", error);
        return NextResponse.json(
            { message: "Error updating selected goal" },
            { status: 500 }
        );
    }
}