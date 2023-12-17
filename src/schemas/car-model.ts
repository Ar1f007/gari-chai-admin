import { z } from "zod";

// When creating a model from admin
export const addCarModelSchema = z.object({
  brandId: z.object(
    {
      value: z.string().min(1, "Select a brand first"),
      label: z.string().min(1, "Select a brand first"),
    },
    { required_error: "required", invalid_type_error: "select a brand" }
  ),
  name: z.string().min(1, "required"),
  upcoming: z.boolean().default(false),
});

export type CarModelInputs = z.infer<typeof addCarModelSchema>;

// API fetched model
export const carModelSchema = z.object({
  _id: z.string(),
  name: z.string(),
  carCollectionCount: z.number(),
  brand: z.string(),
  upcoming: z.boolean(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type TCarModelSchema = z.infer<typeof carModelSchema>;
