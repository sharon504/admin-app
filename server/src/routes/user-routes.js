import { Router } from "express";
import { userController } from "#controllers";
import { authHandler } from "#middlewares";

const userRouter = Router();
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.userLogin);
userRouter.put("/:id", authHandler, userController.updateUser);
userRouter.delete("/:id", authHandler, userController.deleteUser);
userRouter.get("/:id", authHandler, userController.getUser);
userRouter.get("/", authHandler, userController.getUsers);
userRouter.put("/:id/role", authHandler, userController.updateUserRole);
userRouter.delete("/:id/role", authHandler, userController.deleteUserRole);

export default userRouter;
