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

async () => {
  await dbClient.sync({ force: true });
  await Roles.sync({ force: true });
  await Permissions.sync({ force: true });
};
Users.belongsToMany(Roles, {
  through: "UserRole",
  foreignKey: "userId",
});

Roles.belongsToMany(Users, {
  through: "UserRole",
  foreignKey: "roleId",
});

Roles.belongsToMany(Permissions, {
  through: "RolePermissions",
  foreignKey: "roleId",
});
Permissions.belongsToMany(Roles, {
  through: "RolePermissions",
  foreignKey: "permissionId",
});

export { Permissions, Roles, Users, dbClient };
