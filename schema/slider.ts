import { z } from "zod";

export const sliderSchema = z.object({
  title: z.optional(z.string().max(30)),
  showTitle: z.boolean(),
  sliderLink: z.optional(z.string()),
  sliderImg: z.instanceof(File, {
    message: "add an image",
  }),
});

export type SliderInputs = z.infer<typeof sliderSchema>;
