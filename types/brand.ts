import { BrandInputs } from "@/schema/client/brand";
import { ImagePayload } from "./others";

export type BRAND = {
  logo: string;
  name: string;
  visitors: number;
  revenues: string;
  sales: number;
  conversion: number;
};

export type TBrand = {
  _id: string;
  name: string;
  slug: string;
  image?: ImagePayload;
};

export type TBrandPayload = {
  image?: Partial<ImagePayload>;
} & BrandInputs;
