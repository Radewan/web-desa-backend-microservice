import express from "express";
import { errorMiddleware } from "../middlewares/error-middleware";
import { privateRouter } from "../routers/private-router";
import cors from "cors";

export const web = express();
web.use(
  cors({
    origin: "http://localhost:8080",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

web.use(express.json());

web.use("/comments", privateRouter);

web.use(errorMiddleware);
