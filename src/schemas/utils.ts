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

export const minMaxPriceSchema = z
  .object({
    min: z.coerce.number({ ...isNumberRequiredErrMsg }),
    max: z.coerce.number({ ...isNumberRequiredErrMsg }),
  })
  .refine(
    (val) => {
      // do not allow any negative value
      if (val.min < 0 || val.max < 0) {
        return false;
      }

      // allowing the same value because sometime user do not want to give
      // two different price and that time the price can be both same
      if (val.min == val.max) {
        return true;
      }

      if (val.min > val.max) {
        return false;
      }

      return true;
    },
    { message: "Min value for price can not be greater than max value" }
  );

export type TMinMaxPriceSchema = z.infer<typeof minMaxPriceSchema>;

export type TImageSchema = z.infer<typeof imageSchema>;
