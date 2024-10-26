import { dbClient } from "#utils";
import { DataTypes } from "sequelize";

const RolePermissions = dbClient.define("RolePermissions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "roles",
      key: "id",
    },
  },
  permissionId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "permissions",
      key: "id",
    },
  },
});

export default RolePermissions;
