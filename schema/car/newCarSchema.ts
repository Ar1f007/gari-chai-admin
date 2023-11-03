import { z } from "zod";
import dayjs from "dayjs";

import type { Dayjs } from "dayjs";

import { getCurrentYear, xCharacterLong } from "@/util/other";

export const engineSchemaBasic = z.object({
  type: z.string().min(1, "required"),
  displacement: z.string().optional(),
  horsePower: z.string().optional(),
  torque: z.string().optional(),
});

export const createNewCarSchema = z.object({
  name: z.string().min(1, "required").min(3, xCharacterLong(3)),

  year: z
    .string()
    .default(getCurrentYear())
    .transform((v) => Number(v)),

  registrationYear: z
    .string()
    .min(1, "required")
    .transform((v) => Number(v)),

  description: z.string().optional(),

  brand: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "required", invalid_type_error: "select a brand" }
  ),

  modelNumber: z
    .string()
    .min(1, "required")
    .transform((v) => Number(v)),

  engineType: z.string().min(1, "required"),
  engineDisplacement: z
    .string()
    .optional()
    .transform((v) => Number(v)),
  engineHorsePower: z
    .string()
    .optional()
    .transform((v) => Number(v)),
  engineTorque: z
    .string()
    .optional()
    .transform((v) => Number(v)),

  transmission: z.string().min(1, "required"),

  bodyStyle: z.string().min(1, "required"),

  fuelType: z.string().min(1, "required"),
  fuelCityEconomy: z
    .string()
    .optional()
    .transform((v) => Number(v)),
  fuelHighwayEconomy: z
    .string()
    .optional()
    .transform((v) => Number(v)),

  acceleration0To60: z
    .string()
    .optional()
    .transform((v) => Number(v)),
  accelerationTopSpeed: z
    .string()
    .optional()
    .transform((v) => Number(v)),

  safetyFeatures: z.string().optional(),

  infotainmentSystem: z.string().optional(),

  mileage: z
    .string()
    .min(1, "required")
    .transform((v) => Number(v)),

  imageUrls: z.array(z.string()).optional(),

  color: z.string().min(1, "required"),

  baseInteriorColor: z.string().min(1, "required"),

  numberOfDoors: z
    .string()
    .min(1, "required")
    .transform((v) => Number(v)),

  posterImage: z.instanceof(File, { message: "Image is required" }),

  price: z
    .string()
    .min(1, "required")
    .transform((v) => Number(v)),

  tags: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional(),

  publishedAt: z
    .instanceof(dayjs as unknown as typeof Dayjs, {
      message: "Not a valid date",
    })
    .default(dayjs()),
});

export type NewCarInputs = z.infer<typeof createNewCarSchema>;
