import { xCharacterLong } from "@/utils/other";
import { z } from "zod";

export const createBrandSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required")
    .min(3, xCharacterLong("Brand name", 3)),
  image: z.union([
    z.instanceof(File, {
      message: "add a brand image",
    }),
    z.string(),
  ]),
});

export type BrandInputs = z.infer<typeof createBrandSchema>;
