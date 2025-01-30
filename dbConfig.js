import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database", error.message);
  }
};