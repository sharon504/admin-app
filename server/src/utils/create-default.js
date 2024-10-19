import { Permissions, Roles, Users, dbClient } from "#models";
import { Op } from "sequelize";
import { PERMISSIONS } from "#utils";
import middlewares from "#middlewares";

const { asyncErrorHandler, ErrorHandler } = middlewares;

const createPermissions = asyncErrorHandler(async () => {
  for (const permission of PERMISSIONS) {
    await dbClient.sync();
    if (await Permissions.findOne({ where: { name: permission } })) {
      console.log(`Permission ${permission} exists`);
      continue;
    } else {
      await Permissions.create({
        name: permission,
      });
      console.log(`Created permission ${permission}`);
    }
  }
});

const createAdminRoles = asyncErrorHandler(async () => {
  if (await Roles.findOne({ where: { name: "admin" } })) {
    console.log("AdminRoles exists");
  } else {
    const permissions = await Permissions.findAll();
    const role = await Roles.create({
      name: "admin",
    });

    role.addPermissions(permissions);
    console.log("AdminRoles created");
  }
});

const createUserRoles = asyncErrorHandler(async () => {
  if (await Roles.findOne({ where: { name: "default" } })) {
    console.log("UserRoles exists");
  } else {
    const permissions = await Permissions.findAll({
      where: {
        name: {
          [Op.or]: ["user.update_self", "user.read_self"],
        },
      },
    });
    const role = await Roles.create({
      name: "default",
    });
    role.addPermissions(permissions);
    console.log("UserRoles created");
  }
});

const createSubAdminRoles = asyncErrorHandler(async () => {
  if (await Roles.findOne({ where: { name: "subAdmin" } })) {
    console.log("SubAdminRoles exists");
  } else {
    const permissions = await Permissions.findAll({
      where: {
        name: {
          [Op.or]: [
            "user.update",
            "user.read",
            "user.create",
            "user.delete",
            "user.update_self",
            "user.read_self",
          ],
        },
      },
    });
    const role = await Roles.create({
      name: "subAdmin",
    });
    role.addPermissions(permissions);
    console.log("SubAdminRoles created");
  }
});

const createAdmin = asyncErrorHandler(async () => {
  const user = await Users.findOne({
    where: {
      username: "default",
    },
  });
  if (!user) {
    const role = await Roles.findOne({
      where: {
        name: "default",
      },
    });
    const adminUser = await Users.create({
      username: "default",
      password: "adminPassword",
      email: "admin@admin.com",
    });
    adminUser.addRole(role);
    console.log("Admin created");
  } else {
    console.log("Admin exists");
  }
});

export default {
  createPermissions,
  createAdminRoles,
  createUserRoles,
  createSubAdminRoles,
  createAdmin,
};
