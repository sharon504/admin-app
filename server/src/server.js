import dotenv from "dotenv";
import app from "./app.js";
import { createDefaults } from "#utils";

dotenv.config({});
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});
await createDefaults.createPermissions();
await createDefaults.createUserRoles();
await createDefaults.createSubAdminRoles();
await createDefaults.createAdminRoles();
await createDefaults.createAdmin();
