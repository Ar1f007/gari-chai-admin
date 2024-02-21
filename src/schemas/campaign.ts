import { z } from "zod";
import { imageSchema, minMaxPriceSchema } from "./utils";
import { carSchema } from "@/services";

export const createCampaign = z.object({
  title: z
    .string()
    .min(1, "Please add a title")
    .max(100, "Too Long (max 100 characters)"),

  tagline: z.string().optional(),

  description: z.string().optional(),

  startDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({
      required_error: "Please select a start date and time",
      invalid_type_error: "That's not a date!",
    })
  ),

  endDate: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z.date({
      required_error: "Please select a end date and time",
      invalid_type_error: "That's not a date!",
    })
  ),

  isActive: z.boolean(),

  cars: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        type: z.enum(["new", "used"]),
        image: z.string(),
        brand: z.string(),
        model: z.string(),
        price: minMaxPriceSchema,
      })
    )
    .refine((val) => !!val.length, {
      message: "Please select cars for campaign",
    }),

  posterImage: z.union([
    imageSchema,
    z.instanceof(File, {
      message: "add a campaign poster image",
    }),
  ]),
});

export const carCampaignSchema = z.object({
  _id: z.string(),

  title: z.string(),

  tagline: z.string().optional(),

  description: z.string().optional(),

  startDate: z.string(),

  endDate: z.string(),

  isActive: z.boolean(),

  posterImage: imageSchema,

  metaData: z.record(z.string().min(1), z.unknown()).optional().default({}),

  newCars: z.array(
    z.object({
      car: carSchema,
      campaignPrice: minMaxPriceSchema,
    })
  ),

  usedCars: z.array(
    // z.object({
    //   car: any,
    //   campaignPrice: minMaxPriceSchema,
    // })
    z.any()
  ),

  sort: z.number().optional(),

  link: z.string().optional(),

  // TODO: FIX IT
  createdBy: z.any().optional(),
});

export type CreateCampaignForm = z.infer<typeof createCampaign>;
export type TCarCampaign = z.infer<typeof carCampaignSchema>;
