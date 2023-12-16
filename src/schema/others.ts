import { z } from "zod";

export const imageSchema = z.object({
  thumbnailUrl: z.string().url().optional(),
  originalUrl: z.string().url(),
});

export const numberOrNaN = z.union([z.number(), z.nan()]);

export const numberOrNull = z.union([z.number(), z.null()]);

export const singleSpecificationSchema = z.object({
  name: z.string().min(1, "name is required"),
  value: z.union([z.string().min(1, "value is required"), z.boolean()]),
  valueType: z
    .object(
      {
        value: z.enum(["boolean", "text"]),
        label: z.string(),
      },
      {
        invalid_type_error: "Please select a type",
        required_error: "Please select a type",
      }
    )
    .transform((type) => type.value),
});

export const isNumberRequiredErrMsg = {
  invalid_type_error: "required a number",
};