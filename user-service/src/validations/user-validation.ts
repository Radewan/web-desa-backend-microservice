import { z, ZodType } from "zod";

export class UserValidation {
  static register: ZodType = z.object({
    name: z.string().min(1).max(255),
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
  });

  static login: ZodType = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
  });

  static update: ZodType = z.object({
    name: z.string().min(1).max(255).optional(),
    email: z.string().email().min(1).max(255).optional(),
    password: z.string().min(6).max(255).optional(),
  });
}
