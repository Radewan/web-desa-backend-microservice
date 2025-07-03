import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import {
  NewsCreateRequest,
  NewsUpdateRequest,
  toNewsDetailResponse,
  toNewsResponse,
  toNewsResponseArray,
} from "../models/news-model";
import { UserPayload } from "../models/user-model";
import { Validation } from "../validations/validation";
import { NewsValidation } from "../validations/news-validation";
import path from "node:path";
import fs from "node:fs/promises";

export class NewsService {
  static async get(newsId: number) {
    const news = await prismaClient.news.findFirst({
      where: {
        id: newsId,
      },
      include: {
        comments: true,
        user: true,
      },
    });

    if (!news) {
      throw new ResponseError(404, "News not found");
    }

    return toNewsDetailResponse(news);
  }

  static async getAll() {
    const news = await prismaClient.news.findMany({});

    return toNewsResponseArray(news);
  }

  static async create(
    newsCreateRequest: NewsCreateRequest,
    user: UserPayload,
    file?: Express.Multer.File
  ) {
    if (user.role !== "ADMIN") {
      throw new ResponseError(403, "Forbidden");
    }
    const request = Validation.validate(
      NewsValidation.create,
      newsCreateRequest
    );
    if (!file) {
      throw new ResponseError(400, "No files uploaded");
    }

    const news = await prismaClient.news.create({
      data: {
        ...request,
        user_id: user.id,
        image_path: file.filename,
      },
    });

    return toNewsResponse(news);
  }

  static async update(
    newsUpdateRequest: NewsUpdateRequest,
    user: UserPayload,
    newsId: number,
    file?: Express.Multer.File
  ) {
    const news = await prismaClient.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      throw new ResponseError(404, "News not found");
    }

    if (news.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    const request = Validation.validate(
      NewsValidation.update,
      newsUpdateRequest
    );

    if (file) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "images",
        news.image_path
      );
      await fs.unlink(filePath);
    }

    const newsUpdate = await prismaClient.news.update({
      where: {
        id: newsId,
      },
      data: {
        ...(request.title && { title: request.title }),
        ...(request.content && { content: request.content }),
        ...(file?.filename && { image_path: file.filename }),
      },
    });

    return toNewsResponse(newsUpdate);
  }

  static async delete(user: UserPayload, newsId: number) {
    const news = await prismaClient.news.findUnique({
      where: {
        id: newsId,
      },
    });

    if (!news) {
      throw new ResponseError(404, "News not found");
    }

    if (news.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      news.image_path
    );
    await fs.unlink(filePath);

    await prismaClient.news.delete({
      where: {
        id: newsId,
      },
    });
  }
}
