import dbClient from "./connect-db.js";
import { dbClient as db } from "#models";
import PERMISSIONS, {
  userPermissions,
  rolePermissions,
  permissionsPermissions,
} from "./permissions.js";
import createDefaults from "./create-default.js";

export {
  dbClient,
  db,
  PERMISSIONS,
  userPermissions,
  rolePermissions,
  permissionsPermissions,
  createDefaults,
};
