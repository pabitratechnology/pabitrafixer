import mongoose from "mongoose";
import { seedDatabase } from "../utils/seed";

export async function connectDB(uri: string): Promise<void> {
  let retries = 5;
  while (retries > 0) {
    try {
      console.log(`Attempting to connect to MongoDB (${retries} retries left)...`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });
      console.log("Successfully connected to MongoDB");
      await seedDatabase();
      return;
    } catch (err) {
      retries--;
      console.error("MongoDB connection failed:", err);
      if (retries === 0) {
        console.error("All MongoDB connection retries failed.");
        throw err;
      }
      console.log("Retrying in 5 seconds...");
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
}
