import { apiFetch } from "@/lib/api-fetch";
import { endpoints, ReqMethod } from "..";
import { TBrandModel } from "@/types/brand";

export type TAddNewBrandModelPayload = {
  name: string;
  brand: string;
  upcoming: boolean;
};

export async function addBrandModel(payload: TAddNewBrandModelPayload) {
  try {
    const res = await apiFetch<TBrandModel>(endpoints.api.brand.createModel, {
      method: ReqMethod.POST,
      body: payload,
      includeCredentials: false,
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
