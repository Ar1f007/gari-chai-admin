import { z } from "zod";
import { ImagePayload } from "./others";
import { brandSchema } from "@/services";

export type TBrand = {
  _id: string;
  name: string;
  slug: string;
  image?: ImagePayload;
};

// POPULAR BRANDS
/**
 * Schema and type that is used to add popular brands
 */
export const popularBrandFormSchema = z.object({
  popularBrands: z.array(z.object({ value: brandSchema, label: z.string() }), {
    required_error: "Please choose brand",
  }),
});

export type TPopularBrandFormPayload = z.infer<typeof popularBrandFormSchema>;

/**
 * Schema and type that is used to edit popular brands
 */

export const popularBrandEditFormSchema = z.object({
  brand: z.object(
    {
      value: brandSchema,
      label: z.string(),
    },
    {
      required_error: "Please choose brand",
    }
  ),
  sort: z.coerce.number(),
});

export type TPopularBrandEditFormPayload = z.infer<
  typeof popularBrandEditFormSchema
>;

// POPULAR BRANDS
