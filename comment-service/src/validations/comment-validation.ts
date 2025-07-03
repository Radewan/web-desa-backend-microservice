import { z, ZodType } from "zod";

export class CommentValidation {
  static create: ZodType = z.object({
    comment: z.string().min(1),
  });
}
