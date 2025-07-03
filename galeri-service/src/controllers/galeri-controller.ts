import { Request, Response, NextFunction } from "express";
import { UserPayloadRequest } from "../types/user-payload-request";
import { GaleriService } from "../services/galeri-service";
import { ResponseError } from "../errors/response-error";

export class GaleriController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await GaleriService.getAll();
      res.status(200).json({
        images: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async create(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user!;
      await GaleriService.create(req, user);
      res.status(201).json({
        message: "Upload sukses!",
      });
    } catch (e) {
      next(e);
    }
  }

  static async delete(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user!;
      const galeriId = parseInt(req.params.galeriId);
      if (isNaN(galeriId)) {
        throw new ResponseError(400, "Galeri id not valid");
      }
      await GaleriService.delete(user, galeriId);
      res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }
}
