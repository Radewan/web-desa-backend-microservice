import { z, ZodType } from "zod";

export class AgendaValidation {
  static create: ZodType = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    location: z.string().min(1).max(255),
    date: z.coerce.date(),
    time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Format waktu harus HH:mm",
    }),
  });

  static update: ZodType = z.object({
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).optional(),
    location: z.string().min(1).max(255).optional(),
    date: z.coerce.date().optional(),
    time: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: "Format waktu harus HH:mm",
      })
      .optional(),
  });
}
