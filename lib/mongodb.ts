import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/CMS";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var __mongoose:
    | { conn: Mongoose | null; promise: Promise<Mongoose> | null }
    | undefined;
}

const cached = globalThis.__mongoose || { conn: null, promise: null };
globalThis.__mongoose = cached;

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m as Mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
