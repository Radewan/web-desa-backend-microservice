import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { UserController } from "../controllers/user-controller";
export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.patch("/", UserController.update);
privateRouter.delete("/", UserController.delete);

privateRouter.post("/admin/create", UserController.createAdmin);
