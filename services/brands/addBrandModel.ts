import { apiFetch } from "@/lib/apiFetch";
import { endpoints, ReqMethod } from "..";
import { TBrandModel } from "@/types/brand";

export type TAddNewBrandModelPayload = {
  name: string;
  brandId: string;
  upcoming: boolean;
};

export async function addBrandModel(payload: TAddNewBrandModelPayload) {
  try {
    const res = await apiFetch<TBrandModel>(endpoints.api.brand.createModel, {
      method: ReqMethod.POST,
      body: payload,
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
