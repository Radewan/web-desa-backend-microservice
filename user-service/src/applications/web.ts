import express from "express";
import { errorMiddleware } from "../middlewares/error-middleware";
import { publicRouter } from "../routers/public-router";
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

web.use("/users", publicRouter);

web.use("/users", privateRouter);

web.use(errorMiddleware);
