import { xCharacterLong } from "@/util/other";
import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required").min(3, xCharacterLong(3)),
  image: z.instanceof(File, {
    message: "add a brand image",
  }),
});

export type BrandInputs = z.infer<typeof createBrandSchema>;
