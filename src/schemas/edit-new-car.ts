import { xCharacterLong } from "@/utils/other";
import { z } from "zod";

import { createNewCarSchema } from "./new-car";
import { carSchema } from "@/services";
import { MAX_ALLOWED_COLOR_IMAGE } from "@/utils/constants";

export const editNewCarSchema = createNewCarSchema
  .extend({
    slug: z.string().min(3, xCharacterLong("Name", 3)),

    status: z.enum(["available", "sold", "reserved"]).default("available"),

    posterImage: createNewCarSchema.shape.posterImage.optional(),

    initialColors: carSchema.shape.colors,
  })
  .superRefine((val, ctx) => {
    val.colors.map((color, idx) => {
      if (color.imageUrls?.length) {
        const colorImagesLength = color.imageUrls.length;
        const imagesFromOriginalDoc = val.initialColors.find(
          (item) => item.name === color.name
        );

        if (!imagesFromOriginalDoc) return;

        if (imagesFromOriginalDoc) {
          if (
            imagesFromOriginalDoc.imageUrls.length + colorImagesLength >
            MAX_ALLOWED_COLOR_IMAGE
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Too many images max allowed " + MAX_ALLOWED_COLOR_IMAGE,
              fatal: true,
              path: [`colors.${idx}.name`],
            });

            return z.NEVER;
          }
        }
      }
    });
  });

export type EditNewCarInputs = z.infer<typeof editNewCarSchema>;
