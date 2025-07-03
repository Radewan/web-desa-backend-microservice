import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { GaleriController } from "../controllers/galeri-controller";
import { upload } from "../applications/multer";
export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.post("/", upload.array("photos"), GaleriController.create);
privateRouter.delete("/:galeriId", GaleriController.delete);
