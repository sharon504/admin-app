import { Roles, Permissions } from "#models";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";

const createRole = asyncErrorHandler(async (req, res) => {
  const { name, permissions } = req.body;
  const { id: userId } = req.user;
  let permissionsArray = [];
  for (const permission of permissions) {
    const permissionExists = await Permissions.findByPk(permission);
    if (!permissionExists) {
      return next(
        new ErrorHandler(400, `Permission ${permission} not found`, null),
      );
    }
    permissionsArray.push(permission);
  }
  const role = await Roles.create(
    { name },
    { id: userId, permission: "role.create", individual: true },
  );
  role.addPermissions(permissionsArray);
  res
    .status(201)
    .json({ ok: true, message: "Role created successfully", data: role });
});

const getRoles = asyncErrorHandler(async (req, res) => {
  const roles = await Roles.findAll();
  if (!roles) {
    return next(new ErrorHandler(400, "Roles not found", null));
  }
  res
    .status(200)
    .json({ ok: true, message: "Roles retrieved successfully", data: roles });
});

const getRole = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Roles.findByPk(id);
  if (!role) {
    return next(new ErrorHandler(400, "Role not found", null));
  }
  res
    .status(200)
    .json({ ok: true, message: "Role retrieved successfully", data: role });
});

const deleteRolePermission = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { permissionId } = req.body;
  const role = await Roles.findByPk(id, { include: Permissions });
  if (!role) {
    return next(new ErrorHandler(400, "Role not found", null));
  }
  if (!role.permissions.includes(permissionId)) {
    return next(new ErrorHandler(400, "Permission not found", null));
  }
  const permission = await Permissions.findByPk(permissionId);
  if (!permission) {
    return next(new ErrorHandler(400, "Permission not found", null));
  }
  role.removePermission(permission, {
    id: userId,
    permission: "role.delete",
    individual: true,
  });
  res
    .status(200)
    .json({ ok: true, message: "Permission deleted successfully", data: role });
});

const updateRole = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { name, permissions } = req.body;
  const role = await Roles.findByPk(id, { include: Permissions });
  role.name = name;
  let permissionsArray = [];
  for (const permission of permissions) {
    const permissionExists = await Permissions.findByPk(permission);
    if (!permissionExists) {
      return next(new ErrorHandler(400, "Permission not found", null));
    } else if (role.permissions.includes(permission)) {
      continue;
    }
    permissionsArray.push(permission, {
      id: userId,
      permission: "role.update",
      individual: true,
    });
  }
  if (!role) {
    return next(new ErrorHandler(400, "Role not found", null));
  }
  res
    .status(200)
    .json({ ok: true, message: "Role updated successfully", data: role });
});

const deleteRole = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const role = await Roles.findByPk(id);
  if (!role) {
    return next(new ErrorHandler(400, "Role not found", null));
  }
  await role.destroy({
    id: userId,
    permission: "role.delete",
    individual: true,
  });
  res
    .status(200)
    .json({ ok: true, message: "Role deleted successfully", data: role });
});

const roleController = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
  deleteRolePermission,
};

export default roleController;
