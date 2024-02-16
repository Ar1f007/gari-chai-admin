import { apiFetch } from "@/lib/api-fetch";
import { TBrand } from "@/types/brand";
import { endpoints, ReqMethod, TBrandSchema } from "..";

export type TUpdateBrandInfoParams = {
  name: TBrandSchema["name"];
  image: TBrandSchema["image"];
  slug: TBrandSchema["slug"];
};

export async function updateBrandInfo(payload: TUpdateBrandInfoParams) {
  try {
    const url = endpoints.api.brand.base + "/" + payload.slug;

    const res = await apiFetch<TBrand>(url, {
      method: ReqMethod.PATCH,
      body: payload,
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
