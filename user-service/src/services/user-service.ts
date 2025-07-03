import {
  toUserResponse,
  UserPayload,
  UserUpdateRequest,
} from "./../models/user-model";
import { prismaClient } from "../applications/database";
import { ResponseError } from "../errors/response-error";
import {
  toUserPayload,
  UserLoginRequest,
  UserRegisterRequest,
} from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
  static async register(userRegisterRequest: UserRegisterRequest) {
    const request = Validation.validate(
      UserValidation.register,
      userRegisterRequest
    );

    const countUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (countUserWithSameEmail !== 0) {
      throw new ResponseError(400, "Email already exist");
    }

    request.password = await bcryptjs.hash(request.password, 10);

    const user = await prismaClient.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
        role: "USER",
      },
    });

    const userPayload = toUserPayload(user);
    const secretKey = (process.env.JWT_SECRET_KEY as string) ?? "";
    const token = jwt.sign(userPayload, secretKey, { expiresIn: "1W" });

    return toUserResponse(user, token);
  }

  static async login(userLoginRequest: UserLoginRequest) {
    const request = Validation.validate(UserValidation.login, userLoginRequest);

    const user = await prismaClient.user.findUnique({
      where: {
        email: request.email,
      },
    });

    if (!user || !(await bcryptjs.compare(request.password, user.password))) {
      throw new ResponseError(400, "Email or password wrong");
    }

    const userPayload = toUserPayload(user);
    const secretKey = process.env.JWT_SECRET_KEY as string;
    const token = jwt.sign(userPayload, secretKey, { expiresIn: "1W" });

    return toUserResponse(user, token);
  }

  static async update(userUpdateRequest: UserUpdateRequest, user: UserPayload) {
    const request = Validation.validate(
      UserValidation.update,
      userUpdateRequest
    );

    if (request.password) {
      request.password = await bcryptjs.hash(request.password, 10);
    }

    const updateUser = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...(request.name && { name: request.name }),
        ...(request.email && { email: request.email }),
        ...(request.password && { password: request.password }),
      },
    });

    return toUserPayload(updateUser);
  }

  static async delete(user: UserPayload) {
    await prismaClient.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  static async createAdmin(
    userRegisterRequest: UserRegisterRequest,
    user: UserPayload
  ) {
    console.log(user.role);
    if (user.role !== "SUPER_ADMIN") {
      throw new ResponseError(403, "Forbidden");
    }

    const request = Validation.validate(
      UserValidation.register,
      userRegisterRequest
    );

    const countUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: request.email,
      },
    });

    if (countUserWithSameEmail !== 0) {
      throw new ResponseError(400, "Email already exist");
    }

    request.password = await bcryptjs.hash(request.password, 10);

    const userAdmin = await prismaClient.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
        role: "ADMIN",
      },
    });

    return toUserPayload(userAdmin);
  }
}
