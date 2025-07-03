import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import {
  AgendaCreateRequest,
  AgendaUpdateRequest,
  toAgendaDetailResponse,
  toAgendaResponse,
  toAgendaResponseArray,
} from "../models/agenda-model";
import { UserPayload } from "../models/user-model";
import { Validation } from "../validations/validation";
import { AgendaValidation } from "../validations/agenda-validation";
import path from "node:path";
import fs from "node:fs/promises";

export class AgendaService {
  static async get(agendaId: number) {
    const agenda = await prismaClient.agenda.findFirst({
      where: {
        id: agendaId,
      },
      include: {
        comments: true,
        user: true,
      },
    });

    if (!agenda) {
      throw new ResponseError(404, "Agenda not found");
    }

    return toAgendaDetailResponse(agenda);
  }

  static async getAll() {
    const agenda = await prismaClient.agenda.findMany({});

    return toAgendaResponseArray(agenda);
  }

  static async create(
    agendaCreateRequest: AgendaCreateRequest,
    user: UserPayload,
    file?: Express.Multer.File
  ) {
    if (user.role !== "ADMIN") {
      throw new ResponseError(403, "Forbidden");
    }
    const request = Validation.validate(
      AgendaValidation.create,
      agendaCreateRequest
    );
    if (!file) {
      throw new ResponseError(400, "No files uploaded");
    }

    request.time = new Date(
      `${request.date.toISOString().split("T")[0]}T${request.time}:00Z`
    );

    const agenda = await prismaClient.agenda.create({
      data: {
        ...request,
        user_id: user.id,
        image_path: file.filename,
      },
    });

    return toAgendaResponse(agenda);
  }

  static async update(
    agendaUpdateRequest: AgendaUpdateRequest,
    user: UserPayload,
    agendaId: number,
    file?: Express.Multer.File
  ) {
    const agenda = await prismaClient.agenda.findUnique({
      where: {
        id: agendaId,
      },
    });

    if (!agenda) {
      throw new ResponseError(404, "Agenda not found");
    }

    if (agenda.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    const request = Validation.validate(
      AgendaValidation.update,
      agendaUpdateRequest
    );

    if (file) {
      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "images",
        agenda.image_path
      );
      await fs.unlink(filePath);
    }

    request.time = new Date(
      `${request.date.toISOString().split("T")[0]}T${request.time}:00Z`
    );

    const agendaUpdate = await prismaClient.agenda.update({
      where: {
        id: agendaId,
      },
      data: {
        ...(request.title && { title: request.title }),
        ...(request.content && { content: request.content }),
        ...(request.location && { location: request.location }),
        ...(request.date && { date: request.date }),
        ...(request.time && { time: request.time }),
        ...(file?.filename && { image_path: file.filename }),
      },
    });

    return toAgendaResponse(agendaUpdate);
  }

  static async delete(user: UserPayload, agendaId: number) {
    const agenda = await prismaClient.agenda.findUnique({
      where: {
        id: agendaId,
      },
    });

    if (!agenda) {
      throw new ResponseError(404, "Agenda not found");
    }

    if (agenda.user_id !== user.id) {
      throw new ResponseError(403, "Forbidden");
    }

    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "images",
      agenda.image_path
    );
    await fs.unlink(filePath);

    await prismaClient.agenda.delete({
      where: {
        id: agendaId,
      },
    });
  }
}
