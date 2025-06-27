/* Express app */ import express from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
connectDB();

app.use("/api/v6/users", userRoutes);

export default app;
