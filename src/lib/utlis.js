// lib/utlis.js
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

export const connectToDb = async () => {
  try {
    if (!MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    if (mongoose.connection.readyState === 1) return;

    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
};
