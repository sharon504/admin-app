import { Permissions } from "#models";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";

const createPermission = asyncErrorHandler(async (req, res) => {
  const { name } = req.body;
  const { id: userId } = req.user;
  const permission = await Permissions.create(
    { name },
    { id: userId, permission: "permission.create", individual: true },
  );
  if (!permission) {
    return ErrorHandler(res, 400, "Permission not created");
  }
  return res.status(201).json({
    ok: true,
    message: "Permission created successfully",
    data: permission,
  });
});

const getPermissions = asyncErrorHandler(async (req, res) => {
  const permissions = await Permissions.findAll();
  if (!permissions) {
    return ErrorHandler(res, 400, "Permissions not found");
  }
  return res.status(200).json({
    ok: true,
    message: "Permissions fetched successfully",
    data: permissions,
  });
});

const getPermission = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const permission = await Permissions.findByPk(id);
  if (!permission) {
    return ErrorHandler(res, 400, "Permission not found");
  }
  return res.status(200).json({
    ok: true,
    message: "Permission fetched successfully",
    data: permission,
  });
});

const deletePermission = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const permission = await Permissions.findByPk(id);
  if (!permission) {
    return ErrorHandler(res, 400, "Permission not found");
  }
  await permission.destroy({
    id: userId,
    permission: "permission.delete",
    individual: true,
  });
  return res.status(200).json({
    ok: true,
    message: "Permission deleted successfully",
    data: permission,
  });
});

const updatePermission = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { name } = req.body;
  const permission = await Permissions.findByPk(id);
  if (!permission) {
    return ErrorHandler(res, 400, "Permission not found");
  }
  await permission.update(
    { name },
    { id: userId, permission: "permission.update", individual: true },
  );
  return res.status(200).json({
    ok: true,
    message: "Permission updated successfully",
    data: permission,
  });
});

const permissionController = {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission,
};

export default permissionController;
