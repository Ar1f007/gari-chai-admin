import { z } from "zod";

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

  price: z.coerce
    .number({
      invalid_type_error: "required a number",
    })
    .min(1, "required"),

  status: z.boolean(),
});

export type CreateCampaignForm = z.infer<typeof createCampaign>;
