import { Users, Roles } from "#models";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";

const createUser = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  const defaultRole = await Roles.findOne({
    where: {
      name: "default",
    },
  });
  const user = await Users.create({ email, password });
  if (!user) {
    return ErrorHandler(res, 400, "User not created");
  }
  user.addRole(defaultRole);
  return res
    .status(201)
    .json({ ok: true, message: "User created successfully", data: user });
});

const updateUser = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { email, password } = req.body;
  const user = await Users.findByPk(id);
  if (!user) {
    return ErrorHandler(res, 400, "User not found");
  }
  await user.update(
    { email, password },
    { id: userId, permission: "user.update", individual: true },
  );
  return res
    .status(200)
    .json({ ok: true, message: "User updated successfully", data: user });
});

const deleteUser = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const user = await Users.findByPk(id);
  if (!user) {
    return ErrorHandler(res, 400, "User not found");
  }
  await user.destroy({
    id: userId,
    permission: "user.delete",
    individual: true,
  });
  return res
    .status(200)
    .json({ ok: true, message: "User deleted successfully", data: user });
});

const getUser = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  if (!user) {
    return ErrorHandler(res, 400, "User not found");
  }
  return res
    .status(200)
    .json({ ok: true, message: "User fetched successfully", data: user });
});

const getUsers = asyncErrorHandler(async (req, res) => {
  const users = await Users.findAll();
  return res
    .status(200)
    .json({ ok: true, message: "Users fetched successfully", data: users });
});

const updateUserRole = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { roleId } = req.body;
  const user = await Users.findByPk(id);
  if (!user) {
    return new ErrorHandler(404, "User not found", null);
  }
  const role = await Roles.findByPk(roleId);
  if (!role) {
    return new ErrorHandler(404, "Role not found", null);
  }
  user.addRole(role, {
    id: userId,
    permission: "role.update",
    individual: true,
  });
  res
    .status(200)
    .json({ ok: true, message: "User role updated successfully", data: user });
});

const deleteUserRole = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { roleId } = req.body;
  const user = await Users.findByPk(id);
  if (!user) {
    return new ErrorHandler(404, "User not found", null);
  }
  const role = await Roles.findByPk(roleId);
  if (!role) {
    return new ErrorHandler(404, "Role not found", null);
  }
  user.removeRole(role, {
    id: userId,
    permission: "role.delete",
    individual: true,
  });
  res
    .status(200)
    .json({ ok: true, message: "User role deleted successfully", data: user });
});

const userLogin = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return ErrorHandler(res, 400, "Invalid username or password");
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return ErrorHandler(res, 400, "Invalid username or password");
  }
  return res
    .status(200)
    .json({ ok: true, message: "User logged in successfully", data: user });
});

const userController = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  updateUserRole,
  deleteUserRole,
  userLogin,
};

export default userController;
