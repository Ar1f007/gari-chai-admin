import { z } from "zod";
import { apiFetch } from "@/lib/api-fetch";
import { TBrand } from "@/types/brand";
import { endpoints, ReqMethod } from "..";
import { imageSchema } from "@/schemas/utils";

export type TAddNewBrandPayload = {
  name: string;
  image: z.infer<typeof imageSchema>;
};

export async function addBrandName(payload: TAddNewBrandPayload) {
  try {
    const res = await apiFetch<TBrand>(endpoints.api.brand.createBrand, {
      method: ReqMethod.POST,
      body: payload,
      includeCredentials: false,
    });

    return res;
  } catch (error) {
    return undefined;
  }
}
