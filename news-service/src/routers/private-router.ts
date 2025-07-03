import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { upload } from "../applications/multer";
import { NewsController } from "../controllers/news-controller";
export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.post("/", upload.single("photo"), NewsController.create);
privateRouter.patch("/:newsId", upload.single("photo"), NewsController.update);
privateRouter.delete("/:newsId", NewsController.delete);
