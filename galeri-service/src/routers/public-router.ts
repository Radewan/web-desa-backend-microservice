import express from "express";
import { GaleriController } from "../controllers/galeri-controller";

export const publicRouter = express.Router();

publicRouter.get("/", GaleriController.getAll);
