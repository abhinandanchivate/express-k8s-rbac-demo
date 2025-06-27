/* Express app */
import express from "express";
import { connectDB } from "./config/db.js";
import assetRoutes from "./routes/assetRoutes.js";

const app = express();

app.use(express.json());
connectDB();

app.use("/api/v6/assets", assetRoutes);

export default app;
