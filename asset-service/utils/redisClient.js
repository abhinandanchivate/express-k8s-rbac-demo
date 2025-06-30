/* Redis client connection */ import { createClient } from "redis";
import config from "config";

const redisUrl = config.get("REDIS_URL") || "redis://localhost:6379";

const redisClient = createClient({
  url: redisUrl,
});

redisClient.on("connect", () => {
  console.log(" Redis client connected for User Service");
});

redisClient.on("error", (err) => {
  console.error(" Redis connection error:", err);
});

await redisClient.connect();

export default redisClient;
