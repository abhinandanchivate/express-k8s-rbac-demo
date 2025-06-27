/* App server setup */
import app from "./app.js";
import config from "config";

const PORT = config.get("PORT") || 5002;

app.listen(PORT, () => {
  console.log(`Asset Service running on port ${PORT}`);
});
