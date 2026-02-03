/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
const mongoDB_URL = process.env.MONGODB_ATLAS_URL || `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.fx54vz0.mongodb.net/dayframe?appName=Cluster0`;

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null,
    };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };
        cached.promise = mongoose.connect(mongoDB_URL, opts).then((m) => {
            return m;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.conn = null;
        throw error;
    }
    return cached.conn;
}