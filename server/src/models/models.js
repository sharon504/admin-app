import { dbClient } from "#utils";
try {
  await dbClient.authenticate();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection failed: ", error);
}

import Permissions from "./permissions-model.js";
import Roles from "./roles-model.js";
import Users from "./users-model.js";
import UserRole from "./user-role-model.js";
import RolePermissions from "./role-permissions-model.js";

Users.belongsToMany(Roles, {
  through: UserRole,
  foreignKey: "userId",
});

Roles.belongsToMany(Users, {
  through: UserRole,
  foreignKey: "roleId",
});

Roles.belongsToMany(Permissions, {
  through: RolePermissions,
  foreignKey: "roleId",
});
Permissions.belongsToMany(Roles, {
  through: RolePermissions,
  foreignKey: "permissionId",
});

export { Permissions, Roles, Users, dbClient, UserRole, RolePermissions };
