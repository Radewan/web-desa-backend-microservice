import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { CommentController } from "../controllers/comment-controller";
export const privateRouter = express.Router();

privateRouter.use(authMiddleware);

privateRouter.post("/news/:newsId", CommentController.createNews);
privateRouter.post("/agenda/:agendaId", CommentController.createAgenda);
privateRouter.put("/:commentId", CommentController.update);
privateRouter.delete("/:commentId", CommentController.delete);
