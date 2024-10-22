import { Router } from "express";
import { permissionController } from "#controllers";

const permissionsRouter = Router();

permissionsRouter.post("/", permissionController.createPermission);
permissionsRouter.get("/", permissionController.getPermissions);
permissionsRouter.put("/:id", permissionController.updatePermission);
permissionsRouter.delete("/:id", permissionController.deletePermission);
permissionsRouter.use("/:id", permissionController.getPermission);

export default permissionsRouter;
