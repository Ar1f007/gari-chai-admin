import { z } from "zod";

export const imageSchema = z.object({
  thumbnailUrl: z.string().url(),
  originalUrl: z.string().url(),
});

export const numberOrNaN = z.union([z.number(), z.nan()]);

export const numberOrNull = z.union([z.number(), z.null()]);

export const singleSpecificationSchema = z.object({
  name: z.string().min(1, "name is required"),
  value: z.union([z.string().min(1, "value is required"), z.boolean()]),
  valueType: z.object(
    {
      value: z.enum(["boolean", "text"]),
      label: z.string(),
    },
    {
      invalid_type_error: "Please select a type",
      required_error: "Please select a type",
    }
  ),
});

export const isNumberRequiredErrMsg = {
  invalid_type_error: "required a number",
};

export const fileSchema = z.custom<FileList>();

export const fuelTypeSchema = z.object({
  label: z.string(),
  value: z.object({
    fuelType: z.string(),
    fullForm: z.string(),
  }),
});

export const selectOptionSchema = z.object(
  {
    value: z.string().or(z.any()),
    label: z.string(),
  },
  { required_error: "required", invalid_type_error: "required" }
);
