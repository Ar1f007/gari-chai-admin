import { carSchema } from "@/services";
import { HOME_SETTINGS_OPTIONS } from "@/utils/constants";
import { z } from "zod";

export const addCarToHomePageSchema = z
  .object({
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

    tag: z
      .array(
        z.object({
          label: z.string().min(1, "Required"),
          value: z.string().min(1, "required"),
        })
      )
      .default([])
      .optional(),

    sort: z.coerce.number().gte(0),
  })
  .superRefine((val, ctx) => {
    if (
      val.sectionToAdd.value === HOME_SETTINGS_OPTIONS.electricCars &&
      val.tag?.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tag"],
        message: "Select a category",
      });
    }

    if (
      val.sectionToAdd.value !== HOME_SETTINGS_OPTIONS.electricCars &&
      !val.tag?.length
    ) {
      val.tag = [];
    }
  })
  .transform((val) => {
    if (
      val.sectionToAdd.value !== HOME_SETTINGS_OPTIONS.electricCars &&
      !!val.tag?.length
    ) {
      return {
        ...val,
        tag: [],
      };
    } else {
      return val;
    }
  });

export type AddCarToHomePageInputs = z.infer<typeof addCarToHomePageSchema>;
