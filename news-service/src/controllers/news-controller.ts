import { Request, Response, NextFunction } from "express";
import { UserPayloadRequest } from "../types/user-payload-request";
import { ResponseError } from "../errors/response-error";
import { NewsService } from "../services/news-service";
import { NewsCreateRequest, NewsUpdateRequest } from "../models/news-model";

export class NewsController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const newsId = parseInt(req.params.newsId);
      if (isNaN(newsId)) {
        throw new ResponseError(404, "News not found");
      }
      const response = await NewsService.get(newsId);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await NewsService.getAll();
      res.status(200).json(response);
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
      const newsCreateRequest = req.body as NewsCreateRequest;
      const user = req.user!;
      const response = await NewsService.create(
        newsCreateRequest,
        user,
        req.file
      );
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async update(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newsUpdateRequest = req.body as NewsUpdateRequest;
      const user = req.user!;
      const newsId = parseInt(req.params.newsId);
      if (isNaN(newsId)) {
        throw new ResponseError(400, "News id not valid");
      }
      const response = await NewsService.update(
        newsUpdateRequest,
        user,
        newsId,
        req.file
      );
      res.status(200).json(response);
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
      const newsId = parseInt(req.params.newsId);
      if (isNaN(newsId)) {
        throw new ResponseError(400, "News id not valid");
      }
      await NewsService.delete(user, newsId);
      res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }
}
