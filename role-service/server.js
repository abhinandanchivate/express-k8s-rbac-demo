/* App server setup */ // --- role-service/server.js ---
import app from "./app.js";
import config from "config";

const PORT = config.get("PORT") || 5003;

app.listen(PORT, () => {
  console.log(`Role Service running on port ${PORT}`);
});
