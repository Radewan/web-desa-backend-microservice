import express from "express";
import { NewsController } from "../controllers/news-controller";

export const publicRouter = express.Router();

publicRouter.get("/", NewsController.getAll);
publicRouter.get("/:newsId", NewsController.get);
