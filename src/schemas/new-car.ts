import { z } from "zod";

import { xCharacterLong } from "@/utils/other";
import {
  numberOrNaN,
  isNumberRequiredErrMsg,
  singleSpecificationSchema,
} from "./utils";

export const engineSchemaBasic = z.object({
  type: z.string().min(1, "required"),
  displacement: z.string().optional(),
  horsePower: z.string().optional(),
  torque: z.string().optional(),
});

export const selectOptionSchema = z.object(
  {
    value: z.string().or(z.any()),
    label: z.string(),
  },
  { required_error: "required", invalid_type_error: "required" }
);

export const createNewCarSchema = z.object({
  name: z.string().min(1, "required").min(3, xCharacterLong("Name", 3)),

  brand: selectOptionSchema.transform((brand) => ({
    id: brand.value,
    name: brand.label,
  })),

  brandModel: selectOptionSchema.transform((brandModel) => ({
    id: brandModel.value,
    name: brandModel.label,
  })),

  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
      { invalid_type_error: "required", required_error: "Select car type" }
    )
    .refine((val) => val.length, { message: "required" })
    .default([]),

  bodyStyle: selectOptionSchema.transform((bodyStyle) => ({
    id: bodyStyle.value,
    name: bodyStyle.label,
  })),

  seatingCapacity: z.coerce
    .number({ ...isNumberRequiredErrMsg })
    .min(1, "required"),

  numOfDoors: z.coerce.number({ ...isNumberRequiredErrMsg }).min(1, "required"),

  colors: z
    .array(
      z.object({
        name: z.string().min(1, "Color name is required"),
        imageUrls: z.array(z.string()).optional(),
      })
    )
    .optional()
    .default([]),

  transmission: z.string().min(1, "required"),

  fuel: z.object({
    typeInfo: selectOptionSchema.transform((fuelType) => fuelType.value),
  }),

  price: z.object({
    min: z.coerce.number({ ...isNumberRequiredErrMsg }).min(1, "required"),
    max: z.coerce.number({ ...isNumberRequiredErrMsg }).min(1, "required"),
    isNegotiable: z.boolean(),
  }),

  launchedAt: z
    .preprocess(
      (arg) => {
        if (typeof arg === "string" || arg instanceof Date)
          return new Date(arg);
      },
      z.date({
        required_error: "Please select a date and time",
        invalid_type_error: "That's not a date!",
      })
    )
    .default(new Date()),

  posterImage: z.instanceof(File, { message: "Image is required" }),

  imageUrls: z.array(z.string()).optional(),

  description: z.optional(
    z.string().refine((val) => {
      if (val) {
        return val.length >= 200;
      }
      return true;
    }, "Description is optional, but if you want add one, then make sure it is at least 200 characters long")
  ),

  specificationsByGroup: z
    .optional(
      z.array(
        z.object({
          groupName: z.string().min(3, xCharacterLong("Group name", 3)),
          values: z.array(singleSpecificationSchema),
        })
      )
    )
    .default([]),

  additionalSpecifications: z
    .optional(z.array(singleSpecificationSchema))
    .default([]),

  cities: z.optional(
    z
      .array(z.object({ value: z.string(), label: z.string() }))
      .transform((cities) => cities.map((city) => city.value))
  ),
});

export type NewCarInputs = z.infer<typeof createNewCarSchema>;
