import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../models/user-model";
import { UserPayloadRequest } from "../types/user-payload-request";
import { prismaClient } from "../applications/database";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerAuthorizationn = req.header("Authorization");
    const token = headerAuthorizationn && headerAuthorizationn.split(" ")[1];

    if (!token) {
      throw new Error("Unauthorized");
    }

    const secretKey = (process.env.JWT_SECRET_KEY as string) ?? "";
    const userPayload = jwt.verify(token, secretKey) as UserPayload;
    const user = await prismaClient.user.findUnique({
      where: {
        id: userPayload.id,
      },
    });
    if (!user) {
      throw new Error("Unauthorized");
    }
    (req as UserPayloadRequest).user = userPayload;
    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
