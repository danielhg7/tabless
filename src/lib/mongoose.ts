import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    console.log("Before connecting to MONGODB");
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected with Mongoose");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};