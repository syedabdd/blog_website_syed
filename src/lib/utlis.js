  // lib/utlis.js
  import mongoose from "mongoose";

  const MONGO = process.env.MONGO || "your_mongodb_connection_string_here";

  export const connectToDb = async () => {
    try {
      if (mongoose.connection.readyState === 1) return;

      await mongoose.connect(MONGO);
      console.log("MongoDB connected ✅");
    } catch (err) {
      console.error("MongoDB connection error ❌", err);
      throw err;
    }
  };
