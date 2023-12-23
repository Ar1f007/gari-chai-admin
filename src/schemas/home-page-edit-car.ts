import { carSchema } from "@/services";
import { HOME_SETTINGS_OPTIONS } from "@/utils/constants";
import { z } from "zod";

export const editHomePageCarSchema = z
  .object({
    selectedCar: z.object({
      label: z.string().min(1, "Required"),
      value: carSchema,
    }),

    sectionToAdd: z.object({
      label: z.string().min(1, "Required"),
      value: z.string().min(1, "required"),
    }),

    tags: z
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
      val.tags?.length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["tag"],
        message: "Select a category",
      });
    }

    if (
      val.sectionToAdd.value !== HOME_SETTINGS_OPTIONS.electricCars &&
      !val.tags?.length
    ) {
      val.tags = [];
    }
  })
  .transform((val) => {
    console.log(val.sort);

    if (
      val.sectionToAdd.value !== HOME_SETTINGS_OPTIONS.electricCars &&
      !!val.tags?.length
    ) {
      return {
        ...val,
        tag: [],
      };
    } else {
      return val;
    }
  });

export type EditHomePageCarInputs = z.infer<typeof editHomePageCarSchema>;
