import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
       const connectionInstant = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
       console.log(`MongoDB connected !! DB HOST:${connectionInstant.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
        
    }
}
export default connectDB;