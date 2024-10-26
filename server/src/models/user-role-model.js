import { dbClient } from "#utils";
import { DataTypes } from "sequelize";

const UserRole = dbClient.define("UserRole", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "roles",
      key: "id",
    },
  },
});

export default UserRole;
