import { apiFetch } from "@/lib/apiFetch";
import { endpoints } from "./endpoints";
import { ReqMethod } from "./serviceHelper";
import { TBrandPayload, TBrand } from "@/types/brand";

export async function addBrandName(payload: TBrandPayload) {
  return apiFetch<TBrand>(endpoints.api.brand.createBrand, {
    method: ReqMethod.POST,
    body: payload,
  });
}
