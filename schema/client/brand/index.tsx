import { xCharacterLong } from "@/util/other";
import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(3, xCharacterLong(3)),
});

export type BrandInputs = z.infer<typeof createBrandSchema>;
