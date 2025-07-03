import { Request, Response, NextFunction } from "express";
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserUpdateRequest,
} from "../models/user-model";
import { UserService } from "../services/user-service";
import { UserPayloadRequest } from "../types/user-payload-request";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userRegisterRequest = req.body as UserRegisterRequest;
      const response = await UserService.register(userRegisterRequest);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userLoginRequest = req.body as UserLoginRequest;
      const response = await UserService.login(userLoginRequest);
      res.status(200).json(response);
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
      const userUpdateRequest = req.body as UserUpdateRequest;
      const user = req.user!;
      const response = await UserService.update(userUpdateRequest, user);
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
      await UserService.delete(user);
      res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }

  static async createAdmin(
    req: UserPayloadRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user!;
      const userRegisterRequest = req.body as UserRegisterRequest;
      const response = await UserService.createAdmin(userRegisterRequest, user);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }
}
