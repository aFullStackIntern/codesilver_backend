import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.mongo_uri}${db_name}`
    );
    console.log(
      `\n Mongodb connected!! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connectin error ", error);
    process.exit(1);
  }
};

export default connectDB;
