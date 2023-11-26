import { z } from "zod";

import { xCharacterLong } from "@/util/other";
import {
  isNumberRequiredErrMsg,
  numberOrNaN,
  singleSpecificationSchema,
} from "../others";

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

  brand: selectOptionSchema.transform((brand) => brand.value),

  brandModel: selectOptionSchema.transform((brandModel) => brandModel.value),

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

  bodyStyle: selectOptionSchema.transform((bodyStyle) => bodyStyle.value),

  engine: z.object({
    type: z.string().min(1, "Required"),
    numOfCylinders: numberOrNaN,
    horsePower: numberOrNaN,
    torque: numberOrNaN,
  }),

  mileage: z.number({ ...isNumberRequiredErrMsg }).min(1, "required"),

  seatingCapacity: z.number({ ...isNumberRequiredErrMsg }).min(1, "required"),

  numOfDoors: z.number({ ...isNumberRequiredErrMsg }).min(1, "required"),

  color: z.string().min(1, "required"),

  baseInteriorColor: z.string().min(1, "required"),

  transmission: z.string().min(1, "required"),

  fuel: z.object({
    typeInfo: selectOptionSchema.transform((fuelType) => fuelType.value),

    economy: z.object({
      city: z.union([z.number({ ...isNumberRequiredErrMsg }), z.nan()]),
      highway: z.union([z.number({ ...isNumberRequiredErrMsg }), z.nan()]),
    }),
  }),

  price: z.object({
    min: z.number({ ...isNumberRequiredErrMsg }).min(1, "required"),
    max: z.number({ ...isNumberRequiredErrMsg }).min(1, "required"),
    isNegotiable: z.boolean(),
  }),

  acceleration: z.object({
    zeroTo60: numberOrNaN,
    topSpeed: numberOrNaN,
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
});

export type NewCarInputs = z.infer<typeof createNewCarSchema>;
