import { z } from "zod";
import { imageSchema } from "./utils";

export const vendorSchema = z.object({
  _id: z.string(),
  name: z.string().min(1),
  phone: z.string().min(1),
  carCollectionCount: z.number(),
  email: z.string().optional(),
  address: z.string().optional(),
  image: imageSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TVendorSchema = z.infer<typeof vendorSchema>;
