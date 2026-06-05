import mongoose from "mongoose";

/**
 * Connects to MongoDB using Mongoose.
 * Called once at server startup from server.js.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB connected");
  } catch (err) {
    throw new Error(
      `MongoDB connection failed (${err.message}). Is MongoDB running at ${uri}?`
    );
  }
}
