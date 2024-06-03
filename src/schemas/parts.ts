import { z } from "zod";
import { imageSchema } from "./utils";

export const addPartSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .transform((v) => +v),
  stock: z
    .string()
    .min(1, "Please specify how many you have available in stock")
    .transform((v) => +v),
  status: z.boolean().default(true),
  warranty: z.string().optional(),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
  posterImage: z.instanceof(File, { message: "Image is required" }),
  imageUrls: z
    .array(
      z.object({
        key: z.string(),
        url: imageSchema,
      })
    )
    .optional()
    .default([]),

  metaData: z.record(z.string().min(1), z.any()).optional().default({}),
});

export const carPartSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.number(),
  discount: z.number(),
  stock: z.number(),
  status: z.boolean(),
  warranty: z.string().optional(),
  manufacturer: z.string().optional(),
  posterImage: imageSchema,
  imageUrls: z
    .array(
      z.object({
        key: z.string(),
        url: imageSchema,
      })
    )
    .optional(),
  videos: z.array(z.string()).optional(),
  isVerified: z.boolean(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AddPartSchema = z.infer<typeof addPartSchema>;
export type TCarPartSchema = z.infer<typeof carPartSchema>;
