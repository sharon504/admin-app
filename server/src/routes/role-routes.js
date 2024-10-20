import { Router } from "express";
import { roleController } from "../controllers/controllers";

const roleRouter = Router();

roleController.post("/", roleController.createRole);
roleController.get("/", roleController.getRoles);
roleController.get("/:id", roleController.getRole);
roleController.put("/:id", roleController.updateRole);
roleController.delete("/:id", roleController.deleteRole);

roleRouter.use("/:id", roleController.getRole);

export default roleRouter;
