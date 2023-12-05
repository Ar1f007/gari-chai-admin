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

export type SliderInputs = z.infer<typeof sliderSchema>;
