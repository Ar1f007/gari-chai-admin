import { carSchema } from "@/services";
import { z } from "zod";

export const addCarToHomePageSchema = z.object({
  brand: z.object({
    label: z.string().min(1, "Required"),
    value: z.string().min(1, "required"),
  }),

  selectedCar: z.object({
    label: z.string().min(1, "Required"),
    value: carSchema,
  }),

  sectionToAdd: z.object({
    label: z.string().min(1, "Required"),
    value: z.string().min(1, "required"),
  }),

  tag: z.optional(
    z.object({
      label: z.string().min(1, "Required"),
      value: z.string().min(1, "required"),
    })
  ),

  sort: z.coerce.number().gte(0),
});

export type AddCarToHomePageInputs = z.infer<typeof addCarToHomePageSchema>;
