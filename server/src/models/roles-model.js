import { DataTypes } from "sequelize";
import { db, roleChecker } from "#utils";
import { v4 as uuid } from "uuid";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";

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

Roles.beforeUpdate(
  asyncErrorHandler(async (options) => {
    const { id, permission } = options;
    if (roleChecker(id, permission)) {
      return;
    }
    return new ErrorHandler(403, "Unauthorized", null);
  }),
);

Roles.beforeCreate(
  asyncErrorHandler(async (options) => {
    const { id, permission } = options;
    if (roleChecker(id, permission)) {
      return;
    }
    return new ErrorHandler(403, "Unauthorized", null);
  }),
);

Roles.beforeDestroy(
  asyncErrorHandler(async (options) => {
    const { id, permission } = options;
    if (roleChecker(id, permission)) {
      return;
    }
    return new ErrorHandler(403, "Unauthorized", null);
  }),
);

export default Roles;
