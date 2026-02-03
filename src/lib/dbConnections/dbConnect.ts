/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
const mongoDB_URL= process.env.MONGODB_ATLAS_URL;

if(!mongoDB_URL){
    throw new Error("define database url in the .env file");
}

let cached = (global as any).mongoose;

if(!cached){
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    };
}

export async function dbConnect() {
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(mongoDB_URL!).then((mongoose) => {
            return mongoose
        });
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.conn = null;
        throw error;
    }
    return cached.conn;
}
