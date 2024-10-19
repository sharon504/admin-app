import { Users, Permissions, Roles } from "#models";

const roleChecker = async (id, permission) => {
  const user = await Users.findByPk(id, { include: Roles });
  if (!user) {
    return false;
  }
  const permittedPermissions = user.roles.flatMap((role) =>
    role.permissions.map((permission) => permission.name),
  );
  if (
    permittedPermissions.includes(permission) &&
    (await Permissions.find({ where: { name: permission } }))
  ) {
    return true;
  }
  return false;
};

export default roleChecker;
