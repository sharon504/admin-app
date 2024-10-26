import { Users, Roles, UserRole } from "#models";
import { ErrorHandler, asyncErrorHandler } from "#middlewares";

const createUser = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const defaultRole = await Roles.findOne({
    where: {
      name: "default",
    },
  });
  let previousUser = await Users.findOne({ where: { username } });
  if (previousUser) {
    return next(new ErrorHandler(409, "Username already exists", null));
  }
  previousUser = await Users.findOne({ where: { email } });
  if (previousUser) {
    return next(new ErrorHandler(409, "Email already exists", null));
  }
  const user = await Users.create({ username, email, password });
  if (!user) {
    return;
  }
  user.addRole(defaultRole);
  return res
    .status(201)
    .json({ ok: true, message: "User created successfully", data: user });
});

const updateUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { email, password } = req.body;
  const user = await Users.findByPk(id);
  if (!user) {
    return next(new ErrorHandler(400, "User not found", null));
  }
  if (id === userId) {
    await user.update(
      { email, password },
      { id: userId, permission: "user.update_self", individual: true },
    );
  } else {
    await user.update(
      { email, password },
      { id: userId, permission: "user.update", individual: true },
    );
  }
  return res
    .status(200)
    .json({ ok: true, message: "User updated successfully", data: user });
});

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const user = await Users.findByPk(id);
  if (!user) {
    return next(new ErrorHandler(400, "User not found", null));
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

const getUser = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  if (!user) {
    return next(new ErrorHandler(400, "User not found", null));
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

const updateUserRole = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { roleId } = req.body;
  const user = await Users.findByPk(id);
  if (!user) {
    return next(new ErrorHandler(404, "User not found", null));
  }
  const role = await Roles.findByPk(roleId);
  if (!role) {
    return next(new ErrorHandler(404, "Role not found", null));
  }
  if (id === userId) {
    user.addRole(role, {
      id: userId,
      permission: "user.self_edit_role",
      individual: true,
    });
  } else {
    user.addRole(role, {
      id: userId,
      permission: "role.update",
      individual: true,
    });
  }
  res
    .status(200)
    .json({ ok: true, message: "User role updated successfully", data: user });
});

const deleteUserRole = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { roleId } = req.body;
  const user = await Users.findByPk(id);
  if (!user) {
    return next(new ErrorHandler(404, "User not found", null));
  }
  const role = await Roles.findByPk(roleId);
  if (!role) {
    return next(new ErrorHandler(404, "Role not found", null));
  }
  if (id === userId) {
    user.removeRole(role, {
      id: userId,
      permission: "user.self_edit_role",
      individual: true,
    });
  } else {
    user.removeRole(role, {
      id: userId,
      permission: "role.update",
      individual: true,
    });
  }
  res
    .status(200)
    .json({ ok: true, message: "User role deleted successfully", data: user });
});

const userLogin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await Users.scope("withPassword").findOne({
    where: { email },
    include: [
      {
        model: Roles,
        through: {
          model: UserRole,
          attributes: ["id", "userId", "roleId"], // Include the join table attributes
        },
      },
    ],
  });
  console.log(user);
  if (!user) {
    return next(new ErrorHandler(400, "Invalid username or password", null));
  }
  const isPasswordMatch = await user.comparePassword(password, user);
  if (!isPasswordMatch) {
    return next(new ErrorHandler(400, "Invalid username or password", null));
  }
  const token = await user.getAuthToken(user);
  return res.status(200).json({
    ok: true,
    message: "User logged in successfully",
    data: { token, user },
  });
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
