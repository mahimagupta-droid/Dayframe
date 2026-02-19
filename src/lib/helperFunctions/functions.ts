// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { dbConnect } from "../dbConnections/dbConnect";

// export async function requireAuth() {
//     const { userId } = await auth();
//     if (!userId) {
//         return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }
//     await dbConnect();
//     return userId;
// }