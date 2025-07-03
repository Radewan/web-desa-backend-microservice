import { Request, Response, NextFunction } from "express";
import { UserPayloadRequest } from "../types/user-payload-request";
import { ResponseError } from "../errors/response-error";
import { AgendaService } from "../services/agenda-service";
import { AgendaCreateRequest, AgendaUpdateRequest } from "../models/agenda-model";

export class AgendaController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const agendaId = parseInt(req.params.agendaId);
      if (isNaN(agendaId)) {
        throw new ResponseError(404, "Agenda not found");
      }
      const response = await AgendaService.get(agendaId);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await AgendaService.getAll();
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
      const agendaCreateRequest = req.body as AgendaCreateRequest;
      const user = req.user!;
      const response = await AgendaService.create(
        agendaCreateRequest,
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
      const agendaUpdateRequest = req.body as AgendaUpdateRequest;
      const user = req.user!;
      const agendaId = parseInt(req.params.agendaId);
      if (isNaN(agendaId)) {
        throw new ResponseError(400, "Agenda id not valid");
      }
      const response = await AgendaService.update(
        agendaUpdateRequest,
        user,
        agendaId,
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
      const agendaId = parseInt(req.params.agendaId);
      if (isNaN(agendaId)) {
        throw new ResponseError(400, "Agenda id not valid");
      }
      await AgendaService.delete(user, agendaId);
      res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }
}
