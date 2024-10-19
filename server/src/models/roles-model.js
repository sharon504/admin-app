import { DataTypes } from "sequelize";
import { db } from "#utils";
import { v4 as uuid } from "uuid";

const Roles = db.define("role", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

export default Roles;
