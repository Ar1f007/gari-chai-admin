import { imageSchema } from "@/schema/others";
import { z } from "zod";

export const createCarBodyStyleSchema = z.object({
  name: z.string().min(1, "Required"),
  image: z.instanceof(File).optional(),
});

export type CarBodyStyleInputs = z.infer<typeof createCarBodyStyleSchema>;
