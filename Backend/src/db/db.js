import mongoose from "mongoose";
import { ENV } from "../utils/env.js";

const connectDB = async () => {
  try {
    console.log("FINAL URI =", `${ENV.MONGO_URI}/ChatAppDB`);
    const connectionInstance = await mongoose.connect(
      `${ENV.MONGO_URI}/ChatAppDB`,
    );
    console.log(
      `Mongo DB connected || Host: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
