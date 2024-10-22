import { DataTypes } from "sequelize";
import { roleChecker } from "#utils";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";
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

// Permissions.beforeUpdate(
//   asyncErrorHandler(async (options) => {
//     const { id, permission } = options;
//     if (roleChecker(id, permission)) {
//       return;
//     }
//     return new ErrorHandler(403, "Unauthorized", null);
//   }),
// );
//
// Permissions.beforeCreate(
//   asyncErrorHandler(async (options) => {
//     const { id, permission } = options;
//     if (roleChecker(id, permission)) {
//       return;
//     }
//     return new ErrorHandler(403, "Unauthorized", null);
//   }),
// );
//
// Permissions.beforeDestroy(
//   asyncErrorHandler(async (options) => {
//     const { id, permission } = options;
//     if (roleChecker(id, permission)) {
//       return;
//     }
//     return new ErrorHandler(403, "Unauthorized", null);
//   }),
// );

export default Permissions;
