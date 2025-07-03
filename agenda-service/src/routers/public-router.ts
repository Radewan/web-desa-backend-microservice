import express from "express";
import { AgendaController } from "../controllers/agenda-controller";

export const publicRouter = express.Router();

publicRouter.get("/", AgendaController.getAll);
publicRouter.get("/:agendaId", AgendaController.get);
