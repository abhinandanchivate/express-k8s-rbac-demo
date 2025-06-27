/* Express app */ import express from "express";
import { connectDB } from "./config/db.js";
import roleRoutes from "./routes/roleRoutes.js";

const app = express();

app.use(express.json());
connectDB();

app.use("/api/v6/roles", roleRoutes);

export default app;
