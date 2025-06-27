/* MongoDB connection setup */
import mongoose from "mongoose";
import config from "config";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.get("MONGO_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected for Role Service");
  } catch (err) {
    console.error("Role Service DB Connection Error:", err);
    process.exit(1);
  }
};
