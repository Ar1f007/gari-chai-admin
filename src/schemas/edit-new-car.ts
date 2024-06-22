import { xCharacterLong } from "@/utils/other";
import { z } from "zod";

import { createNewCarSchema } from "./new-car";
import { imageSchema } from "./utils";

export const editNewCarSchema = createNewCarSchema
  .extend({
    slug: z.string().min(3, xCharacterLong("Name", 3)),

    status: z.enum(["available", "sold", "reserved"]).default("available"),

    posterImage: z.union([
      imageSchema,
      z.instanceof(File, { message: "Image is required" }),
    ]),
  })
  .superRefine((val, ctx) => {});

export type EditNewCarInputs = z.infer<typeof editNewCarSchema>;
