import express from "express";
import { errorMiddleware } from "../middlewares/error-middleware";
import { publicRouter } from "../routers/public-router";
import { privateRouter } from "../routers/private-router";
import cors from "cors";
import path from "node:path";

export const web = express();
web.use(
  cors({
    origin: "http://localhost:8080",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

web.use(express.json());

web.use(
  "/galeri/images",
  express.static(path.join(__dirname, "..", "..", "public", "images"))
);

web.use("/galeri", publicRouter);

web.use("/galeri", privateRouter);

web.use(errorMiddleware);
