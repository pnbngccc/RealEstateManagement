import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("connect success");
  } catch (error) {
    console.log("connect fail", error);
  }
};
export default connectDB;
