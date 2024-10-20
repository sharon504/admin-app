import { Router } from "express";
import { permissionController } from "../controllers/controllers";

const permissionRouter = Router();

permissionController.post("/", permissionController.createPermission);
permissionController.get("/", permissionController.getPermissions);
permissionController.get("/:id", permissionController.getPermission);
permissionController.put("/:id", permissionController.updatePermission);
permissionController.delete("/:id", permissionController.deletePermission);

permissionRouter.use("/:id", permissionController.getPermission);

export default permissionRouter;
