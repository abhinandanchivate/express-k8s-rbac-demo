/* App server setup */ import app from "./app.js";
import config from "config";

const PORT = config.get("PORT") || 5001;

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
