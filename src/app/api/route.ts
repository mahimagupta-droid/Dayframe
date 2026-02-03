import { NextResponse } from "next/server";
// import mongoose from "mongoose"
import { dbConnect } from "@/lib/dbConnections/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({
      message: "successful",
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({error: error});
  }
}
