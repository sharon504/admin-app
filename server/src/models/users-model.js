import { DataTypes } from "sequelize";
import { db, roleChecker } from "#utils";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";

const User = db.define(
  "user",
  {
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
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
    scopes: {
      withPassword: {
        attributes: {
          include: ["password"],
        },
      },
    },
  },
);

User.prototype.comparePassword = async function (password, user) {
  return bcrypt.compareSync(password, user.password);
};

User.prototype.getAuthToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

User.prototype.validateAuthToken = function (token) {
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

User.beforeUpdate(
  asyncErrorHandler(async (_user, options) => {
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
  asyncErrorHandler(async (_user, options) => {
    const { id, permission } = options;
    if (roleChecker(id, permission)) {
      return;
    }
    return new ErrorHandler(403, "Unauthorized", null);
  }),
);

export default User;
