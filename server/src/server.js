import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({});
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});
