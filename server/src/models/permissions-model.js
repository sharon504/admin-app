import { DataTypes } from "sequelize";
import { db } from "#utils";
import { v4 as uuid } from "uuid";

const Permissions = db.define("permissions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid(),
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export default Permissions;
