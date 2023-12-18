import { z } from "zod";

export const sliderSchema = z.object({
  title: z.optional(z.string().max(30)),
  showTitle: z.boolean(),
  link: z.optional(z.string()),
  sliderImg: z.instanceof(File, {
    message: "add an image",
  }),
  type: z.boolean(),
});

export const editSliderSchema = sliderSchema.extend({
  sliderImg: z
    .undefined()
    .or(z.instanceof(File, { message: "image should be of type file" })),
  type: z.boolean(),
  sort: z.coerce.number().min(0),
  status: z.boolean(),
});

export type SliderInputs = z.infer<typeof sliderSchema>;

export type EditSliderInputs = z.infer<typeof editSliderSchema>;
