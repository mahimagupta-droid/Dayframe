import { dbConnect } from "@/lib/dbConnections/dbConnect";
import { Tasks } from "@/lib/models/Tasks";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    
    // Attempt to drop the specific index causing issues
    try {
        await Tasks.collection.dropIndex("id_1");
    } catch (e: any) {
        // Ignore if index not found, might have been already deleted
        if (e.code !== 27) { // 27 is IndexNotFound
             console.log("Index id_1 might not exist or other error:", e.message);
        }
    }

    // Also try to sync indexes to match the schema
    await Tasks.syncIndexes();

    return NextResponse.json({ success: true, message: "Attempted to drop id_1 index and synced indexes." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
