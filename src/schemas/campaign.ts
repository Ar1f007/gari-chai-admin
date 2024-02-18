import { z } from "zod";
import { imageSchema } from "./utils";

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
        price: z.number(),
      })
    )
    .refine((val) => val.length > 0, {
      message: "Please select cars for campaign",
    }),

  posterImage: z.union([
    imageSchema,
    z.instanceof(File, {
      message: "add a campaign poster image",
    }),
  ]),
});

export type CreateCampaignForm = z.infer<typeof createCampaign>;
