import { Permissions, Roles, Users, dbClient } from "#models";
import { Op } from "sequelize";
import { PERMISSIONS } from "#utils";

const createPermissions = async () => {
  for (const permission of PERMISSIONS) {
    await dbClient.sync();
    try {
      await Permissions.create({
        name: permission,
      });
      console.log(`Created permission ${permission}`);
    } catch (error) {
      // console.log("Error: ", error);
      console.log("Permissions exists");
    }
  }
};

const createAdminRoles = async () => {
  try {
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
  } catch (error) {
    console.log("Error: ", error);
  }
};

const createUserRoles = async () => {
  try {
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
  } catch (error) {
    // console.log("Error: ", error);
    console.log("UserRoles exists");
  }
};

const createSubAdminRoles = async () => {
  try {
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
  } catch (error) {
    // console.log("Error: ", error);
    console.log("SubAdminRoles exists");
  }
};

const createAdmin = async () => {
  try {
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
  } catch (error) {
    console.log("Error: ", error);
  }
};

export default {
  createPermissions,
  createAdminRoles,
  createUserRoles,
  createSubAdminRoles,
  createAdmin,
};
