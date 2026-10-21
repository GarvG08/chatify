import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI;

export const connectDB = async (retries = 5, delay = 5000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      if (!MONGO_URI) {
        throw new Error("MONGODB_URI environment variable is not set!");
      }
      const conn = await mongoose.connect(MONGO_URI);
      console.log("MongoDB Connected Successfully 🎉", conn.connection.host);
      return; // success — exit the loop
    } catch (err) {
      console.error(`MongoDB connection error (attempt ${attempt}/${retries}):`, err.message);
      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000}s...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        // Only exit if all retries are exhausted in production
        if (process.env.NODE_ENV === "production") {
          console.error("All MongoDB connection attempts failed. Exiting...");
          process.exit(1);
        }
      }
    }
  }
};