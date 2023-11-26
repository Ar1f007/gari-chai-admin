import { z } from "zod";

export const imageSchema = z.object({
  thumbnailUrl: z.string().url(),
  originalUrl: z.string().url(),
});

export const numberOrNaN = z.union([z.number(), z.nan()]);

export const numberOrNull = z.union([z.number(), z.null()]);

export const singleSpecificationSchema = z.object({
  name: z.string().min(1, "name is required"),
  value: z.string().min(1, "value is required"),
});

export const isNumberRequiredErrMsg = {
  invalid_type_error: "required a number",
};
