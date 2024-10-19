let user = [
  "read",
  "create",
  "delete",
  "update",
  "self_edit_role",
  "update_self",
  "read_self",
];

let role = ["read", "create", "delete", "update"];

let permissions = ["read", "create", "delete", "update"];

let PERMISSIONS = [];
PERMISSIONS.push(user.map((p) => `user.${p}`));
PERMISSIONS.push(role.map((p) => `role.${p}`));
PERMISSIONS.push(permissions.map((p) => `permissions.${p}`));

export default PERMISSIONS.flat();
export {
  user as userPermissions,
  role as rolePermissions,
  permissions as permissionsPermissions,
};
