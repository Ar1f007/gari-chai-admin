import { z } from "zod";
import { ImagePayload } from "./others";
import { brandSchema } from "@/services";

export type TBrand = {
  _id: string;
  name: string;
  slug: string;
  image?: ImagePayload;
};

/**
 * Schema and type that is used to add popular brands
 */
// POPULAR BRANDS
export const PopularBrandFormSchema = z.object({
  popularBrands: z.array(z.object({ value: brandSchema, label: z.string() }), {
    required_error: "Please choose brand",
  }),
});

export type TPopularBrandFormSchema = z.infer<typeof PopularBrandFormSchema>;
// POPULAR BRANDS
