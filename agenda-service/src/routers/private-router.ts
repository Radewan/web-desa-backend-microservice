import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { upload } from "../applications/multer";
import { AgendaController } from "../controllers/agenda-controller";
export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.post("/", upload.single("photo"), AgendaController.create);
privateRouter.patch("/:agendaId", upload.single("photo"), AgendaController.update);
privateRouter.delete("/:agendaId", AgendaController.delete);
