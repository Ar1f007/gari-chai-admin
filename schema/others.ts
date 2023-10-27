import { z } from "zod";

export const imageSchema = z.object({
  thumbnailUrl: z.string().url(),
  originalUrl: z.string().url(),
});
