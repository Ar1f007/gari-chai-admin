import { z } from "zod";

export const imageSchema = z.object({
  thumbnailUrl: z.string().url(),
  originalUrl: z.string().url(),
});

export const numberOrNaN = z.union([z.number(), z.nan()]);

export const numberOrNull = z.union([z.number(), z.null()]);
