import { apiFetch } from "@/lib/apiFetch";
import { TBrand } from "@/types/brand";
import { endpoints, ReqMethod } from "..";
import { ImagePayload } from "@/types/others";

export type TAddNewBrandPayload = {
  name: string;
  image: ImagePayload;
};

export async function addBrandName(payload: TAddNewBrandPayload) {
  try {
    const res = await apiFetch<TBrand>(endpoints.api.brand.createBrand, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
