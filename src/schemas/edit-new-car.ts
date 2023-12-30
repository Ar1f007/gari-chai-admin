import { xCharacterLong } from "@/utils/other";
import { z } from "zod";

import { selectOptionSchema } from "./new-car";
import { carSchema } from "@/services";
import { singleSpecificationSchema } from "./utils";

export const editNewCarSchema = carSchema
  .extend({
    slug: z.string().min(3, xCharacterLong("Name", 3)),

    brand: selectOptionSchema,

    brandModel: selectOptionSchema,

    bodyStyle: selectOptionSchema,

    fuel: z.object({
      typeInfo: selectOptionSchema,
    }),

    specificationsByGroup: z
      .optional(
        z.array(
          z.object({
            groupName: z.string().min(3, xCharacterLong("Group name", 3)),
            values: z.array(singleSpecificationSchema),
          })
        )
      )
      .default([]),
  })
  .superRefine((val) => {
    return {
      ...val,
      brand: {
        id: val.brand.value,
        name: val.brand.label,
      },
    };
  });

export type EditNewCarInputs = z.infer<typeof editNewCarSchema>;
