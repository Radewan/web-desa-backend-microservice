import { Response, NextFunction } from "express";
import { UserPayloadRequest } from "../types/user-payload-request";
import { CommentService } from "../services/comment-service";
import { ResponseError } from "../errors/response-error";

export class CommentController {
  static async createNews(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    const user = req.user!;
    const commentCreateRequest = req.body;
    const newsId = parseInt(req.params.newsId);
    if (isNaN(newsId)) {
      throw new ResponseError(400, "Comment id invalid");
    }
    const response = await CommentService.createNews(
      commentCreateRequest,
      user,
      newsId
    );
    res.status(200).json(response);
    try {
    } catch (e) {
      next(e);
    }
  }

  static async createAgenda(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    const user = req.user!;
    const commentCreateRequest = req.body;
    const agendaId = parseInt(req.params.agendaId);
    if (isNaN(agendaId)) {
      throw new ResponseError(400, "Comment id invalid");
    }
    const response = await CommentService.createNews(
      commentCreateRequest,
      user,
      agendaId
    );
    res.status(200).json(response);
    try {
    } catch (e) {
      next(e);
    }
  }
  static async update(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    const user = req.user!;
    const commentCreateRequest = req.body;
    const commentId = parseInt(req.params.commentId);
    if (isNaN(commentId)) {
      throw new ResponseError(400, "Comment id invalid");
    }
    const response = await CommentService.update(
      commentCreateRequest,
      user,
      commentId
    );
    res.status(200).json(response);
    try {
    } catch (e) {
      next(e);
    }
  }

  static async delete(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    const user = req.user!;
    const commentId = parseInt(req.params.commentId);
    if (isNaN(commentId)) {
      throw new ResponseError(400, "Comment id invalid");
    }
    await CommentService.delete(user, commentId);
    res.status(204).json({});
    try {
    } catch (e) {
      next(e);
    }
  }
}
