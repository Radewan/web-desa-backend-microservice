import { z, ZodType } from "zod";

export class NewsValidation {
  static create: ZodType = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
  });

  static update: ZodType = z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
  });
}
