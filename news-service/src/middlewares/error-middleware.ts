import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../errors/response-error";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: error.issues,
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      error: error.message,
    });
  } else {
    res.status(500).json({
      error: error.message,
    });
  }
};
