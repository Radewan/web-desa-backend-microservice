import { Request } from "express";
import { UserPayload } from "../models/user-model";

export interface UserPayloadRequest extends Request {
  user?: UserPayload;
}
