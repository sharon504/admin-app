import { DataTypes } from "sequelize";
import { db } from "#utils";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

const User = db.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuid(),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    set(password) {
      this.setDataValue("password", bcrypt.hashSync(password, 10));
    },
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default User;
