import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("FINAL URI =", `${process.env.MONGO_URI}/ChatAppDB`);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/ChatAppDB`,
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
