import { DataTypes } from "sequelize";
import { db, roleChecker } from "#utils";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import middlewares from "#middlewares";

const { asyncErrorHandler, ErrorHandler } = middlewares;

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

User.beforeUpdate(
  asyncErrorHandler(async (user, options) => {
    const { id, permission } = options;
    if (roleChecker(id, permission)) {
      return;
    }
    return new ErrorHandler(403, "Unauthorized", null);
  }),
);

User.beforeCreate(
  asyncErrorHandler(async (user, options) => {
    const { permission } = options;
    const { id } = user;
    if (roleChecker(id, permission)) {
      return;
    }
    return new ErrorHandler(403, "Unauthorized", null);
  }),
);

User.beforeDestroy(
  asyncErrorHandler(async (user, options) => {
    const { id, permission } = options;
    if (roleChecker(id, permission)) {
      return;
    }
    return new ErrorHandler(403, "Unauthorized", null);
  }),
);

export default User;
