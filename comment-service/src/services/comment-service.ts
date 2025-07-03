import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import { CommentCreateRequest } from "../models/comment-model";
import { UserPayload } from "../models/user-model";
import { CommentValidation } from "../validations/comment-validation";
import { Validation } from "../validations/validation";

export class CommentService {
  static async createNews(
    commentCreateRequest: CommentCreateRequest,
    user: UserPayload,
    newsId: number
  ) {
    const request = Validation.validate(
      CommentValidation.create,
      commentCreateRequest
    );

    const comment = await prismaClient.comment.create({
      data: {
        comment: request.comment,
        user_id: user.id,
        news_id: newsId,
      },
    });

    return comment;
  }

  static async createAgenda(
    commentCreateRequest: CommentCreateRequest,
    user: UserPayload,
    agendaId: number
  ) {
    const request = Validation.validate(
      CommentValidation.create,
      commentCreateRequest
    );

    const comment = await prismaClient.comment.create({
      data: {
        comment: request.comment,
        user_id: user.id,
        agenda_id: agendaId,
      },
    });

    return comment;
  }

  static async update(
    commentCreateRequest: CommentCreateRequest,
    user: UserPayload,
    commentId: number
  ) {
    const request = Validation.validate(
      CommentValidation.create,
      commentCreateRequest
    );

    const comment = await prismaClient.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new ResponseError(404, "Comment not found");
    }

    if (comment.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }
    console.log("a");
    const commentUpdate = await prismaClient.comment.update({
      where: comment,
      data: {
        comment: request.comment,
      },
    });

    return commentUpdate;
  }

  static async delete(user: UserPayload, commentId: number) {
    const comment = await prismaClient.comment.findUnique({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new ResponseError(404, "Comment not found");
    }

    if (comment.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    await prismaClient.comment.delete({
      where: comment,
    });
  }
}
