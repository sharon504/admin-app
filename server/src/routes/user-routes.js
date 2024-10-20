import { Router } from "express";
import { userController } from "#controllers";

const userRouter = Router();
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.get("/:id", userController.getUser);
userRouter.get("/", userController.getUsers);
userRouter.put("/:id/role", userController.updateUserRole);
userRouter.delete("/:id/role", userController.deleteUserRole);

export default userRouter;
