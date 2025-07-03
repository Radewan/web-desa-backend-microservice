import { Request } from "express";
import { ResponseError } from "../errors/response-error";
import { prismaClient } from "../applications/database";
import { UserPayload } from "../models/user-model";
import path from "node:path";
import fs from "node:fs/promises";

export class GaleriService {
  static async getAll() {
    const galeri = await prismaClient.galeri.findMany({});
    return galeri;
  }

  static async create(req: Request, user: UserPayload) {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new ResponseError(400, "No files uploaded");
    }

    const savedFileNames = files.map((file) => ({
      image_path: file.filename,
      user_id: user.id,
    }));

    await prismaClient.galeri.createMany({
      data: savedFileNames,
    });
  }

  static async delete(user: UserPayload, galeriId: number) {
    const galeri = await prismaClient.galeri.findUnique({
      where: {
        id: galeriId,
      },
    });

    if (!galeri) {
      throw new ResponseError(404, "Galeri not found");
    }

    if (galeri.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      galeri.image_path
    );
    await fs.unlink(filePath);

    await prismaClient.galeri.delete({
      where: galeri,
    });
  }
}
