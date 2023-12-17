import { imageSchema } from "@/schema/others";
import { z } from "zod";

export const createCarBodyStyleSchema = z.object({
  name: z.string().min(1, "Required"),
  image: z.instanceof(File).optional(),
});

export type CarBodyStyleInputs = z.infer<typeof createCarBodyStyleSchema>;

export const carBodyStylesSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: z.optional(imageSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TCarBodyStylesSchema = z.infer<typeof carBodyStylesSchema>;
