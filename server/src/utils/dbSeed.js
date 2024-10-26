// import { createDefaults, dbClient } from "#utils";
// import { Users, Roles, Permissions, UserRole, RolePermissions } from "#models";
//
// async function syncDatabase() {
// try {
//   await dbClient.sync({ force: true }); // Use { force: true } to drop existing tables and recreate them
//   console.log("Database synchronization successful");
// } catch (error) {
//   console.error("Database synchronization failed:", error);
// }
//
// await createDefaults.createPermissions();
// await createDefaults.createUserRoles();
// await createDefaults.createSubAdminRoles();
// await createDefaults.createAdminRoles();
//   await createDefaults.createAdmin();
// }
//
// syncDatabase();
