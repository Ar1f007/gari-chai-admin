import { z } from "zod";
import { xCharacterLong } from "@/utils/other";
import { fileSchema, imageSchema } from "./utils";

export const addVendorSchema = z.object({
  name: z
    .string()
    .min(1, "Vendor name is required")
    .min(3, xCharacterLong("Vendor name", 3)),

  phone: z.string().min(1, "Phone number is required"),

  email: z.optional(
    z.string().refine((val) => {
      if (val) {
        const emailSchema = z.string().email();
        return emailSchema.parse(val);
      }
      return true;
    }, "Invalid Email")
  ),

  address: z.optional(z.string()),

  image: z.union([imageSchema, fileSchema]).optional(),
});

export type AddVendorSchema = z.infer<typeof addVendorSchema>;
