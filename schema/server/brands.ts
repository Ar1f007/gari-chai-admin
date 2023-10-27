import { z } from "zod";
import { imageSchema } from "../others";

export const brandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  slug: z.string(),
  image: imageSchema.optional(),
});

export const brandsSchema = z.array(brandSchema);
